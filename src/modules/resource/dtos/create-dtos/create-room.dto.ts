import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
export class CreateRoomDto {
    @ApiProperty({ example: 20, description: 'The capacity of the room' })
    @IsNotEmpty ({ message: 'Capacity is required' })
    @IsNumber({}, { message: 'Capacity must be a number' })
    capacity: number;
}