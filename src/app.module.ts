import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ResourceModule } from './modules/resource/resource.module';
import { PenaltiesController } from './modules/penalties/penalties.controller';
import { PenaltiesService } from './penalties/penalties.service';

@Module({
  imports: [UserModule, AuthModule, PrismaModule, ResourceModule, ConfigModule.forRoot({})],
  controllers: [PenaltiesController],
  providers: [PenaltiesService],
})

export class AppModule {}