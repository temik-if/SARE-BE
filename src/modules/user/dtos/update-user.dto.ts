import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import type { UserType } from '@prisma/client';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ description: 'First name of the user', required: false, example: 'Ana' })
  first_name?: string;

  @ApiProperty({ description: 'Last name of the user', required: false, example: 'Silva' })
  last_name?: string;

  @ApiProperty({ description: 'Email of the user', required: false, example: 'updateUser@email.com' })
  email?: string;

  @ApiProperty({ description: 'Password of the user', required: false, example: 'updatePassword123' })
  password?: string;

  @ApiProperty({ description: 'The type of the user', enum: ['TEACHER', 'COORDINATOR'], required: false, example: 'COORDINATOR' })
  type?: UserType;
}