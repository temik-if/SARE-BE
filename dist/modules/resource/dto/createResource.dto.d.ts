import { CreateEquipmentDto } from "./createEquipment.dto";
import { CreateRoomDto } from "./createRoom.dto";
import { ResourceStatusType } from "@prisma/client";
export declare class CreateResourceDto {
    name: string;
    status: ResourceStatusType;
    equipment?: CreateEquipmentDto;
    room?: CreateRoomDto;
}
