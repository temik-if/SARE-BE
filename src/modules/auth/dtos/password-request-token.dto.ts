import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class PasswordRequestTokenDto {
    @ApiProperty({ 
        example: 'user@email.com', 
        description: 'The email of the user' 
    })
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email' })
    email: string;
}