import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { omit } from "lodash";
import  { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser (email: string, password: string) {
        const user = await this.userService.findUserWithPassword(email);

        if (user && (await bcrypt.compare(password, user.password)) && user.is_active == true) {
            return omit(user, ['password']);
        } else {
            throw new UnauthorizedException('Invalid credentials');
        }
    }

    async login(user: any) { 
        const validatedUser = await this.validateUser(user.email, user.password);
        const payload = { email: validatedUser.email, sub: validatedUser.id, type: validatedUser.type };
        return {
            access_token: this.jwtService.sign(payload),
            user: validatedUser
        };
    }
}