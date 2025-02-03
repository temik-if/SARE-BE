import { ApiProperty } from "@nestjs/swagger";
import { UserType } from "@prisma/client";
import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ example: 'John', description: 'The first name of the user' })
    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: 'Name must be a string' })
    first_name: string;

    @ApiProperty({ example: 'Doe', description: 'The last name of the user' })
    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: 'Name must be a string' })
    last_name: string;
    
    @ApiProperty({ example: 'user@example.com', description: 'The email of the user' })
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email' })
    email: string;
    
    @ApiProperty({ example: 'password', description: 'The password of the user', minLength: 8 })
    @IsNotEmpty({ message: 'Password is required' })
    @IsString({ message: 'Password must be a string' })
    @MinLength(8, { message: 'Password must be at least 8 characters' })
    password: string;
    
    @ApiProperty({ enum: UserType, example: UserType.TEACHER, description: 'The type of the user' })
    @IsNotEmpty({ message: 'UserType is required' })
    @IsEnum(UserType, { message: 'Invalid UserType, choose between TEACHER or COORDINATOR' })
    type: UserType;
}