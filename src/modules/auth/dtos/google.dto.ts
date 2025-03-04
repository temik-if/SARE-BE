import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsNotEmpty, Matches } from 'class-validator';
export class GoogleDto {
  @ApiProperty({
    example: "user@educ.al.gov.br",
    description:
      'The email of the user. Must belong to the domain "educ.al.gov.br".',
  })
  @IsNotEmpty({ message: "Email is required" })
  @IsEmail({}, { message: "Invalid email" })
  email: string;

  @ApiProperty({
    example: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
    description:
      "The idToken is returned by Google OAuth API, and is a JWT containing information on the authenticated user.",
  })
  @IsNotEmpty({ message: "Token is required" })
  @IsString({ message: "Token must be a string" })
  id_token: string;
}