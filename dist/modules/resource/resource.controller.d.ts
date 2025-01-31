import { ResourceService } from './resource.service';
import { CreateResourceDto } from './dto/createResource.dto';
export declare class ResourceController {
    private readonly resourceService;
    constructor(resourceService: ResourceService);
    createResource(createResourceDto: CreateResourceDto): Promise<{
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
    getAllEquipment(): Promise<({
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
    updateResource(id: number, updateResourceDto: CreateResourceDto): Promise<{
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
