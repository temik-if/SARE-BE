import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from '../../prisma/prisma.service';
import { CreateResourceDto } from "./dto/create-dtos/create-resource.dto";
import { ResourceStatusType, ShiftType } from "@prisma/client";
import type { UpdateResourceDto } from "./dto/update-dtos/update-resource.dto";
import type { UpdateResourceStatusDto } from "./dto/update-dtos/update-resourceStatus.dto";

@Injectable()
export class ResourceService{
    constructor(private readonly prismaService: PrismaService) {}

    async validatorResource(data: CreateResourceDto | UpdateResourceDto) {
        if (data.equipment && data.room) {
            throw new BadRequestException('A resource cannot be both an Equipment and a Room.');
        }

        if (data instanceof CreateResourceDto && !data.equipment && !data.room) {
            throw new BadRequestException('A resource must be either an Equipment or a Room.');
        }

        if (data){
            const resource = await this.prismaService.resource.findUnique({
                where: { name: data.name }
            });

            if (resource) {
                throw new BadRequestException('Resource already exists.');
            }
        }

        if (data.equipment) {
            const equipment = await this.prismaService.equipment.findUnique({
                where: { 
                    serial_number: data.equipment.serial_number 
                }
            });

            if (equipment) {
                throw new BadRequestException('Equipment already exists.');
            }
        }
    }

    async createResource(data: CreateResourceDto) {
        await this.validatorResource(data);
        
        const isEquipment = !!data.equipment;
        const isRoom = !!data.room;

    
        return this.prismaService.resource.create({
            data: {
                name: data.name,
                status: data.status,
                equipment: isEquipment ? { create: data.equipment } : undefined,
                room: isRoom ? { create: data.room } : undefined,
            },
            include: { equipment: isEquipment ? true : false, room: isRoom ? true : false },
        });
    }
    

    async getAllResources(status: ResourceStatusType) {
        const validStatus = Object.values(ResourceStatusType);

        if (status && !validStatus.includes(status)) {
            throw new BadRequestException('Invalid status');
        }

        return await this.prismaService.resource.findMany({
            where: status ? { status } : {},
            include: {
                equipment: true,
                room: true
            }
        });
    }

    async getAvailableResources(date: Date, shift: ShiftType, lesson: number[]) {
        return this.prismaService.resource.findMany({
            where: {
                status: 'AVAILABLE',
                bookings: {
                    none: {
                        date: date,
                        shift: shift,
                        class: {
                            hasSome: lesson,
                        },
                    },
                },
            },
            include: {
                equipment: true,
                room: true
            },
        });
    }

    async getAllEquipments(status : ResourceStatusType) {
        const validStatus = Object.values(ResourceStatusType);

        if (status && !validStatus.includes(status)) {
            throw new BadRequestException('Invalid status');
        }

        return await this.prismaService.resource.findMany({
            where: {
                equipment: {
                    isNot: null
                },
                status: status ? status : {}
            },
            include: {
                equipment: true
            }
        });
    }

    async getAllRooms(status: ResourceStatusType) {
        const validStatus = Object.values(ResourceStatusType);

        if (status && !validStatus.includes(status)) {
            throw new BadRequestException('Invalid status');
        }

        return await this.prismaService.resource.findMany({
            where: {
                room: {
                    isNot: null
                },
                status: status ? status : {}
            },
            include: {
                room: true
            }
        });
    }

    async findResourceById(id: number){
        const resource = await this.prismaService.resource.findUnique({
            where: { 
                id
            },
            include: {
                equipment: true,
                room: true
            }
        });

        if (!resource) {
            throw new BadRequestException('Resource not found');
        }

        return resource;
    }

    async findResourceByName(name: string){
        const resource = await this.prismaService.resource.findMany({
            where: { 
                name: {
                    contains: name,
                    mode: 'insensitive'
                }
            },
            include: {
                equipment: true,
                room: true
            }
        });

        return resource;
    }

    async findEquipmentByBrand(brand: string) {
        const resource = await this.prismaService.resource.findMany({
            where: { 
                equipment: {
                    brand: brand
                },
            },
            include: {
                equipment: true, 
            }
        });
    
        return resource;
    }
    
    async findEquipmentByModel(model: string) {
        const resource = await this.prismaService.resource.findMany({
            where: { 
                equipment: {
                    model: model
                },
            },
            include: {
                equipment: true, 
            }
        });
    
        return resource;
    }

    async findEquipmentBySerialNumber(serial_number: string) {
        const resource = await this.prismaService.resource.findMany({
            where: { 
                equipment: {
                    serial_number: serial_number
                },
            },
            include: {
                equipment: true, 
            }
        });
    
        return resource;
    }

    async alterStatusResource(id: number, data: UpdateResourceStatusDto) {
        const resource = await this.prismaService.resource.findUnique({
            where: { id }
        });

        if (!resource) {
            throw new BadRequestException('Resource not found');
        }

        return this.prismaService.resource.update({
            where: { id },
            data: { status: data.status },
        });
    }

    async updateResource (id: number, data: UpdateResourceDto) {
        await this.validatorResource(data);
        
        const isEquipment = !!data.equipment;
        const isRoom = !!data.room;

        const resource = await this.prismaService.resource.findUnique({
            where: { id }
        });

        if (!resource) {
            throw new BadRequestException('Resource not found');
        }

        return this.prismaService.resource.update({
            where: { id },
            data: {
                name: data.name,
                status: data.status,
                equipment: isEquipment ? { update: data.equipment } : undefined,
                room: isRoom ? { update: data.room } : undefined,
            },
            include: { equipment: true, room: true },
        });
    }

    async deleteResource(id: number) {
        const resource = await this.prismaService.resource.findUnique({
            where: { id }
        });

        if (!resource) {
            throw new BadRequestException('Resource not found');
        }

        return this.prismaService.resource.delete({
            where: { id }
        });
    }
}