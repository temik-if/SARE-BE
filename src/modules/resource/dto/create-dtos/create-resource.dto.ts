import { ResourceStatusType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { CreateEquipmentDto } from './create-equipment.dto';
import { CreateRoomDto } from './create-room.dto';
import { ApiProperty } from '@nestjs/swagger';
export class CreateResourceDto {
    @ApiProperty({ example: 'Projector', description: 'The name of the resource' })
    @IsNotEmpty ({ message: 'Name is required' })
    @IsString ({ message: 'Name must be a string' })
    name: string;

    @ApiProperty({ enum: ResourceStatusType, example: ResourceStatusType.AVAILABLE, description: 'The status of the resource' })
    @IsNotEmpty ({ message: 'Status is required' })
    @IsEnum(ResourceStatusType, { message: 'Invalid status, choose between AVAILABLE, UNAVAILABLE, or IN_MAINTENANCE' })
    status: ResourceStatusType;
    
    @ApiProperty({ type: CreateEquipmentDto, description: 'The equipment of the resource' })
    @ValidateIf((obj) => obj.equipment)
    equipment?: CreateEquipmentDto;

    @ApiProperty({ type: CreateRoomDto, description: 'The room of the resource' })
    @ValidateIf((obj) => obj.equipment)
    room?: CreateRoomDto;
}