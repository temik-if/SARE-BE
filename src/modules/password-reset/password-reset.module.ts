import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PasswordResetService } from "./password-reset.service";

@Module({
    providers: [JwtService, PasswordResetService],
    exports: [PasswordResetService]
})

export class PasswordResetModule {}