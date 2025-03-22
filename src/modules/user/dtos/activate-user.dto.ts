import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class ActivateUserDto{
    @ApiProperty({ 
        example: 'user@email.com', 
        description: 'The email of the user' 
    })
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email' })
    email: string;

    @ApiProperty({ example: '123456', description: 'The verification code sent to the user email', minLength: 6 })
    @IsNotEmpty({ message: 'Verification code is required' })
    @IsString({ message: 'Verification code must be a string' })
    @MinLength(6, { message: 'Verification code must be at least 6 characters' })
    code: string;
}