import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt';
import { omit } from 'lodash';
import type { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    private async validatorUser(data: CreateUserDto | UpdateUserDto) {
        if (data.email){
            const user = await this.prismaService.user.findUnique({
                where: { email: data.email }
            });

            if (user) {
                throw new BadRequestException('Email already in use');
            }
        }
    }

    async createUser(data: CreateUserDto) {
        await this.validatorUser(data);
        data.password = await bcrypt.hash(data.password, 10);
        const user = await this.prismaService.user.create({
            data:{
                full_name: `${data.first_name} ${data.last_name}`,
                ...data
            }});
        return omit(user, ['password']);
    }
    
    async getAllUsers() {
        const users = await this.prismaService.user.findMany();
        return users.map(u => omit(u, ['password']));
    }

    async findUserById(id: string){
        const user = await this.prismaService.user.findUnique({
            where: { id }
        });

        if (!user) {
            throw new BadRequestException('User not found');
        }

        return omit(user, ['password']);
    }

    async findUserByEmail(email: string){
        const user = await this.prismaService.user.findUnique({
            where: { email }
        });

        if (!user) {
            throw new BadRequestException('User not found');
        }

        return omit(user, ['password']);
    }

    async findUserByName(name: string){
        const user = await this.prismaService.user.findMany({
            where: {
                full_name: {
                    contains: name,
                    mode: 'insensitive'
                }
            }
        });

        return user.map(u => omit(u, ['password']));
    }

    async updateUser(id: string, data: UpdateUserDto) {
        await this.validatorUser(data);
        
        const user = await this.prismaService.user.findUnique({
            where: { id }
        });

        if (!user) {
            throw new BadRequestException('User not found');
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

        return omit(updatedUser, ['password']);
    }

    async deleteUser(id: string) {
        const user = await this.prismaService.user.findUnique({
            where: { id }
        });

        if (!user) {
            throw new BadRequestException('User not found');
        }

        await this.prismaService.user.delete({
            where: { id }
        });

        return omit(user, ['password']);
    }
}