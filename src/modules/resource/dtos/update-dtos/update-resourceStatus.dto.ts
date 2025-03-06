import { IsEnum } from "class-validator";
import { ResourceStatusType } from '@prisma/client';
import { ApiProperty } from "@nestjs/swagger";

export class UpdateResourceStatusDto {
    @ApiProperty({ example: 'UNAVAILABLE', description: 'The status of the resource' })
    @IsEnum(ResourceStatusType, { message: 'Invalid status' })
    status: ResourceStatusType;
}