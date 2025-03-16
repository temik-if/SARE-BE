import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { omit } from "lodash";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { OAuth2Client } from "google-auth-library";
import { PasswordResetService } from "../password-reset/password-reset.service";
import { PasswordRequestTokenDto } from "./dtos/password-request-token.dto";
import { PasswordResetDto } from "./dtos/password-reset.dto";
import { EmailService } from "../email/email.service";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly passwordResetService: PasswordResetService,
        private readonly emailService: EmailService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string) {
        const user = await this.userService.findUserWithPassword(email);

        if (!user || !(await bcrypt.compare(password, user.password)) || !user.is_active) {
            throw new UnauthorizedException("Invalid credentials");
        }

        return omit(user, ["password"]);
    }

    async login(user: any) {
        const validatedUser = await this.validateUser(user.email, user.password);
        const payload = {
            email: validatedUser.email,
            sub: validatedUser.id,
            type: validatedUser.type
        };

        return {
            access_token: this.jwtService.sign(payload),
            user: validatedUser
        };
    }

    async autoLogin() {
        if (process.env.NODE_ENV !== "development") {
            throw new ForbiddenException("This action is only available in development mode");
        }

        const user = await this.userService.findUserByEmail("teste@educ.al.gov.br");
    
        if (!user) {
            throw new UnauthorizedException("Test user not found");
        }
    
        const token = this.jwtService.sign({ email: user.email, sub: user.id, type: user.type }, { expiresIn: "24h" });
    
        return { access_token: token };
    }
    

    async loginWithGoogle(data: any) {
        const { email, id_token } = data;
        const googlePayload = await this.verifyGoogleToken(id_token);

        if (!googlePayload) {
            throw new UnauthorizedException("Invalid ID token");
        }

        const user = await this.userService.findUserWithPassword(email);

        if (!user || !user.is_active) {
            throw new UnauthorizedException("Invalid credentials or unauthorized user");
        }

        const payload = {
            email: user.email,
            sub: user.id,
            type: user.type
        };

        return {
            access_token: this.jwtService.sign(payload),
            user: omit(user, ["password"])
        };
    }

    private async verifyGoogleToken(idToken: string) {
        try {
            const ticket = await client.verifyIdToken({
                idToken,
                audience: process.env.GOOGLE_CLIENT_ID
            });

            return ticket.getPayload();
        } catch (error) {
            return undefined;
        }
    }

    async requestPasswordReset(data: PasswordRequestTokenDto) {
        const user = await this.userService.findUserByEmail(data.email);

        if (!user) {
            throw new UnauthorizedException("User not found");
        }

        const token = this.jwtService.sign({ email: user.email, sub: user.id }, { expiresIn: "1h" });

        await this.passwordResetService.saveToken(user.id, token);

        await this.emailService.sendPasswordResetEmail(user.email, token);

        return { message: "Password reset instructions have been sent to your email." };
    }

    async resetPassword(data: PasswordResetDto) {
        const payload = this.jwtService.verify(data.token);
        const resetToken = await this.passwordResetService.findToken(payload.sub, data.token);

        if (!resetToken || resetToken.expiresAt < new Date()) {
            throw new BadRequestException("Invalid or expired token");
        }

        await this.userService.updatePassword(payload.sub, data.new_password);
        
        await this.passwordResetService.deleteToken(payload.sub);

        return { message: "Password updated successfully" };
    }
}