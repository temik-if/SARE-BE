import { ApiProperty } from "@nestjs/swagger";
import { UserType } from "@prisma/client";
import { IsEmail, IsEnum, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ example: 'John', description: 'The first name of the user' })
    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: 'Name must be a string' })
    first_name: string;

    @ApiProperty({ example: 'Doe', description: 'The last name of the user' })
    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: 'Name must be a string' })
    last_name: string;
    
    @ApiProperty({ 
        example: 'user@educ.al.gov.br', 
        description: 'The email of the user. Must belong to the domain "educ.al.gov.br" or "professor.educ.al.gov.br".' 
    })
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email' })
    @Matches(/^[a-zA-Z0-9._%+-]+@(educ\.al\.gov\.br|professor\.educ\.al\.gov\.br)$/, { message: 'Email must belong to the domain "educ.al.gov.br" or "professor.educ.al.gov.br"' })
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
    
    @ApiProperty({ enum: UserType, example: UserType.TEACHER, description: 'The type of the user' })
    @IsNotEmpty({ message: 'UserType is required' })
    @IsEnum(UserType, { message: 'Invalid UserType, choose between TEACHER or COORDINATOR' })
    type: UserType;
}