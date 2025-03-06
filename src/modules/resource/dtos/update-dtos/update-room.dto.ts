import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomDto } from '../create-dtos/create-room.dto';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {}