import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsNotEmpty, Matches } from 'class-validator';
export class LoginDto {
    @ApiProperty({ 
        example: 'user@educ.al.gov.br', 
        description: 'The email of the user. Must belong to the domain "educ.al.gov.br".' 
    })
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email' })
    @Matches(/^[a-zA-Z0-9._%+-]+@educ\.al\.gov\.br$/, { message: 'Email must belong to the domain "educ.al.gov.br"' })
    email: string;
  
    @ApiProperty({ 
      example: 'Password1', 
      description: 'The password of the user. Must have at least 8 characters, one uppercase letter, one lowercase letter, and one number.', 
      minLength: 8 
    })
    @IsNotEmpty({ message: 'Password is required' })
    @IsString({ message: 'Password must be a string' })
    @MinLength(8, { message: 'Password must be at least 8 characters' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, { message: 'Password must have at least 8 characters, one uppercase letter, one lowercase letter, and one number' })
    password: string;
}