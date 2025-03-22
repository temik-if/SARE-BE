import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as crypto from 'crypto';
import { VerificationCodeType } from "@prisma/client";

@Injectable()
export class VerificationService {
    constructor(private readonly prismaService: PrismaService) {}

    async generateCode(userId: string, type: VerificationCodeType) {
        const code = crypto.randomInt(100000, 999999).toString(); 
        const expiresAt = new Date(Date.now() + 6 * 60 * 60 * 1000); 
    
        await this.prismaService.verificationCode.upsert({
            where: { user_id: userId },
            update: { code, expiresAt, type },
            create: { user_id: userId, code, expiresAt, type },
        });
    
        return code;
    }
    
    async findCode(user_id: string, code: string) {
        const verificationCode = await this.prismaService.verificationCode.findUnique({
            where: { user_id }
        });

        if (!verificationCode) {
            throw new BadRequestException('Invalid verification code.');
        }

        if (verificationCode.attempts >= 3) {
            await this.deleteCode(user_id);

            throw new BadRequestException('Too many failed attempts. Request a new code.');
        }

        if (verificationCode.expiresAt < new Date()) {
            await this.deleteCode(user_id);

            throw new BadRequestException("Verification code expired");
        }

        if (verificationCode.code !== code) {
            await this.prismaService.verificationCode.update({
                where: { user_id },
                data: { attempts: verificationCode.attempts + 1 }
            });

            throw new BadRequestException('Invalid verification code.');
        }

        await this.prismaService.verificationCode.update({
            where: { user_id },
            data: { attempts: 0 }
        });

        return verificationCode;
    }

    async deleteCode(user_id: string) {
        return this.prismaService.verificationCode.delete({
            where: { user_id }
        });
    }
}