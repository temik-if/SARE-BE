import { PrismaService } from "../../prisma.service";
import { CreateResourceDto } from "./dto/createResource.dto";
export declare class ResourceService {
    private prisma;
    constructor(prisma: PrismaService);
    createResource(data: CreateResourceDto): Promise<{
        id: number;
        name: string;
        status: import(".prisma/client").$Enums.ResourceStatusType;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllResources(): Promise<({
        equipment: {
            serial_number: string;
            model: string;
            brand: string;
            resource_id: number;
        } | null;
        room: {
            capacity: number;
            resource_id: number;
        } | null;
    } & {
        id: number;
        name: string;
        status: import(".prisma/client").$Enums.ResourceStatusType;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getResourceById(id: number): Promise<({
        equipment: {
            serial_number: string;
            model: string;
            brand: string;
            resource_id: number;
        } | null;
        room: {
            capacity: number;
            resource_id: number;
        } | null;
    } & {
        id: number;
        name: string;
        status: import(".prisma/client").$Enums.ResourceStatusType;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    getAllEquipments(): Promise<({
        equipment: {
            serial_number: string;
            model: string;
            brand: string;
            resource_id: number;
        } | null;
    } & {
        id: number;
        name: string;
        status: import(".prisma/client").$Enums.ResourceStatusType;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    updateResource(id: number, data: CreateResourceDto): Promise<{
        id: number;
        name: string;
        status: import(".prisma/client").$Enums.ResourceStatusType;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteResource(id: number): Promise<{
        id: number;
        name: string;
        status: import(".prisma/client").$Enums.ResourceStatusType;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
