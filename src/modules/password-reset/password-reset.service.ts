import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PasswordResetService {
    constructor(
        private readonly prismaService: PrismaService
    ) {}

    async saveToken (user_id: string, token: string) {
        await this.prismaService.passwordResetToken.upsert({
            where: { user_id: user_id },
            update: { token, expiresAt: new Date(Date.now() + 3600000) },
            create: { user_id: user_id, token, expiresAt: new Date(Date.now() + 3600000) }
        });
    }

    async findToken (user_id: string, token: string) {
        return this.prismaService.passwordResetToken.findUnique({
            where: { user_id, token }
        });
    }

    async deleteToken (user_id: string) {
        return this.prismaService.passwordResetToken.delete({
            where: { user_id }
        });
    }
}