import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ResourceModule } from './modules/resource/resource.module';
import { BookingModule } from './modules/booking/booking.module';

@Module({
  imports: [UserModule, AuthModule, PrismaModule, ResourceModule, BookingModule, ConfigModule.forRoot({})],
})

export class AppModule {}