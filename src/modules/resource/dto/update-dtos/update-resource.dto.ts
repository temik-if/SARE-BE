import { PartialType, OmitType } from '@nestjs/mapped-types';
import { ValidateIf } from 'class-validator';
import { CreateResourceDto } from '../create-dtos/create-resource.dto';
import { UpdateEquipmentDto } from './update-equipment.dto';
import { UpdateRoomDto } from './update-room.dto';
import { ApiProperty } from '@nestjs/swagger';
import type { ResourceStatusType } from '@prisma/client';

export class UpdateResourceDto extends PartialType(OmitType(CreateResourceDto, ['equipment', 'room'] as const)) {
    @ApiProperty({ example: 'Update Projector', description: 'The name of the resource' })
    name?: string;
    
    @ApiProperty({ example: 'UNAVAILABLE', description: 'The status of the resource' })
    status?: ResourceStatusType;

    @ApiProperty({ type: UpdateEquipmentDto, description: 'The equipment of the resource' })
    @ValidateIf((obj) => obj.equipment)
    equipment?: UpdateEquipmentDto;

    @ApiProperty({ type: UpdateRoomDto, description: 'The room of the resource' })
    @ValidateIf((obj) => obj.room)
    room?: UpdateRoomDto;
}