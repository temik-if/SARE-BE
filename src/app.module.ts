import { Module } from '@nestjs/common';
import { PrismaService } from "./prisma.service";
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [UserModule],
  providers: [PrismaService]
})

export class AppModule {}