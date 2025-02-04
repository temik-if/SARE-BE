import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";

@Module({
    controllers: [UserController],
    providers: [PrismaService, UserService],
    exports: [UserService]
})

export class UserModule {}