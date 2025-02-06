import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipmentDto } from '../create-dtos/create-equipment.dto';

export class UpdateEquipmentDto extends PartialType(CreateEquipmentDto) {}