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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
const bcrypt = require("bcrypt");
const lodash_1 = require("lodash");
let UserService = class UserService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async validatorUser(data) {
        if (data.email) {
            const user = await this.prismaService.user.findUnique({
                where: { email: data.email }
            });
            if (user) {
                throw new common_1.BadRequestException('Email already in use');
            }
        }
    }
    async createUser(data) {
        await this.validatorUser(data);
        data.password = await bcrypt.hash(data.password, 10);
        const user = await this.prismaService.user.create({
            data: {
                full_name: `${data.first_name} ${data.last_name}`,
                ...data
            }
        });
        return (0, lodash_1.omit)(user, ['password']);
    }
    async getAllUsers() {
        return this.prismaService.user.findMany();
    }
    async findUserById(id) {
        const user = await this.prismaService.user.findUnique({
            where: { id }
        });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        return (0, lodash_1.omit)(user, ['password']);
    }
    async findUserByEmail(email) {
        const user = await this.prismaService.user.findUnique({
            where: { email }
        });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        return (0, lodash_1.omit)(user, ['password']);
    }
    async findUserByName(name) {
        const user = await this.prismaService.user.findMany({
            where: {
                full_name: {
                    contains: name,
                    mode: 'insensitive'
                }
            }
        });
        return user.map(u => (0, lodash_1.omit)(u, ['password']));
    }
    async updateUser(id, data) {
        await this.validatorUser(data);
        const user = await this.prismaService.user.findUnique({
            where: { id }
        });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }
        const first_name = data.first_name ?? user.first_name;
        const last_name = data.last_name ?? user.last_name;
        const full_name = `${first_name} ${last_name}`;
        const updatedUser = await this.prismaService.user.update({
            where: { id },
            data: {
                ...data,
                full_name: full_name
            }
        });
        return (0, lodash_1.omit)(updatedUser, ['password']);
    }
    async deleteUser(id) {
        const user = await this.prismaService.user.findUnique({
            where: { id }
        });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        await this.prismaService.user.delete({
            where: { id }
        });
        return (0, lodash_1.omit)(user, ['password']);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map