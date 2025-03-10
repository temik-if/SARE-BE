import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreatePenaltyDto } from "./create-penalty.dto";
import { OmitType } from '@nestjs/mapped-types';

export class UpdatePenaltyDto extends PartialType(OmitType(CreatePenaltyDto, ['user_id'] as const)) {
    @ApiProperty({ example: 'Updated penalty description', description: 'The description of the penalty' })
    description?: string;

    @ApiProperty({ example: 2, description: 'The duration of the penalty in days' })
    duration?: number;
}