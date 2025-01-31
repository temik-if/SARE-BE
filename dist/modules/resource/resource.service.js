"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
let ResourceService = class ResourceService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createResource(data) {
        if (data.equipment && data.room) {
            throw new Error('Resource cannot be both equipment and room');
        }
        if (data.equipment) {
            return this.prisma.resource.create({
                data: {
                    name: data.name,
                    status: data.status,
                    equipment: {
                        create: data.equipment,
                    },
                },
            });
        }
        if (data.room) {
            return this.prisma.resource.create({
                data: {
                    name: data.name,
                    status: data.status,
                    room: {
                        create: data.room,
                    },
                },
            });
        }
        throw new Error('Either equipment or room must be provided');
    }
    async getAllResources() {
        return this.prisma.resource.findMany({
            include: {
                equipment: true,
                room: true,
            },
        });
    }
    async getResourceById(id) {
        return this.prisma.resource.findUnique({
            where: { id },
            include: {
                equipment: true,
                room: true,
            },
        });
    }
    async getAllEquipments() {
        return this.prisma.resource.findMany({
            where: {
                equipment: {
                    isNot: null,
                },
            },
            include: {
                equipment: true,
            },
        });
    }
    async updateResource(id, data) {
        if (data.equipment && data.room) {
            throw new Error('Resource cannot be both equipment and room');
        }
        return this.prisma.resource.update({
            where: { id },
            data: {
                name: data.name,
                status: data.status,
                equipment: data.equipment ? { update: data.equipment } : undefined,
                room: data.room ? { update: data.room } : undefined,
            },
        });
    }
    async deleteResource(id) {
        return this.prisma.resource.delete({
            where: { id },
        });
    }
};
exports.ResourceService = ResourceService;
exports.ResourceService = ResourceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ResourceService);
//# sourceMappingURL=resource.service.js.map