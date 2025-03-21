import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class PasswordResetDto {
    @ApiProperty({ example: '123456', description: 'The verification code sent to the user email', minLength: 6 })
    @IsNotEmpty({ message: 'Verification code is required' })
    @IsString({ message: 'Verification code must be a string' })
    @MinLength(6, { message: 'Verification code must be at least 6 characters' })
    code: string;

    @ApiProperty({ 
        example: 'user@email.com', 
        description: 'The email of the user' 
    })
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email' })
    email: string;

    @ApiProperty({ 
        example: 'NewPassword1', 
        description: 'The new password. Must have at least 8 characters, one uppercase letter, one lowercase letter, and one number', 
        minLength: 8 
    })
    @IsNotEmpty({ message: 'Password is required' })
    @IsString({ message: 'Password must be a string' })
    @MinLength(8, { message: 'Password must be at least 8 characters' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, { message: 'Password must have at least 8 characters, one uppercase letter, one lowercase letter, and one number' })
    new_password: string;
}