import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CreatePenaltyDto {
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'The id of the user' })
    @IsNotEmpty({ message: 'User id is required' })
    @IsUUID(4, { message: 'User id must be a valid UUID' })
    user_id: string;

    @ApiProperty({ example: 'Penalty description', description: 'The description of the penalty' })
    @IsString({ message: 'Description must be a string' })
    description?: string;

    @ApiProperty({ example: 7, description: 'The duration of the penalty in days' })
    @IsNotEmpty({ message: 'Duration is required' })
    @IsNumber({}, { message: 'Duration must be a number' })
    @IsIn([2, 5, 7], { message: 'Duration must be 2, 5, or 7 days' })
    duration: number;
}