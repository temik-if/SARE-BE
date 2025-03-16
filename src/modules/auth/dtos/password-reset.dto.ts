import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class PasswordResetDto {
    @ApiProperty({example: 'token', description: 'The password reset token'})
    @IsNotEmpty({message: 'Token is required'})
    @IsString({message: 'Token must be a string'}) 
    token: string;

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