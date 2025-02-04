import { Module } from '@nestjs/common';
import { PrismaService } from "./prisma.service";
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UserModule, AuthModule, ConfigModule.forRoot({})],
  providers: [PrismaService]
})

export class AppModule {}