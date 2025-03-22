import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { omit } from "lodash";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { OAuth2Client } from "google-auth-library";
import { PasswordRequestCodeDto } from "./dtos/password-request-code.dto";
import { PasswordResetDto } from "./dtos/password-reset.dto";
import { EmailService } from "../email/email.service";
import { VerificationService } from "src/modules/verification/verification.service";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly verificationService: VerificationService,
        private readonly emailService: EmailService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string) {
        const user = await this.userService.findUserWithPassword(email);

        if (!user || !(await bcrypt.compare(password, user.password))) {
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

        if (validatedUser.is_active == false) {
            const code = await this.verificationService.generateCode(validatedUser.id, "ACTIVATION");
            await this.emailService.sendActivationEmail(validatedUser.email, code);

            throw new UnauthorizedException("User is not activated. Activation code sent to email.");
        }

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

    async requestPasswordReset(data: PasswordRequestCodeDto) {
        const user = await this.userService.findUserByEmail(data.email);

        if (!user) {
            throw new UnauthorizedException("User not found");
        }

        const code = await this.verificationService.generateCode(user.id, "PASSWORD_RESET");
        await this.emailService.sendPasswordResetEmail(user.email, code);

        return { message: "Password reset instructions have been sent to your email." };
    }

    async resetPassword(data: PasswordResetDto) {
        const user = await this.userService.findUserByEmail(data.email);

        await this.verificationService.findCode(user.id, data.code);

        await this.userService.updatePassword(user.id, data.new_password);
        
        await this.verificationService.deleteCode(user.id);

        return { message: "Password updated successfully" };
    }
}