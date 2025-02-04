import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import * as bcrypt from 'bcrypt';
import { omit } from 'lodash';
import type { UpdateUserDto } from "./dtos/update-user.dto";
import type { UserType } from '@prisma/client';

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
        const users = await this.prismaService.user.findMany({});
        return users.map(u => omit(u, ['password']));
    }

    async getAllUsersActive() {
        const users = await this.prismaService.user.findMany({
            where: {
                is_active: true
            }
        });

        return users.map(u => omit(u, ['password']));
    }

    async getAllUsersInactive() {
        const users = await this.prismaService.user.findMany({
            where: {
                is_active: false
            }
        });
        return users.map(u => omit(u, ['password']));
    }

    async findUserById(id: string){
        const user = await this.prismaService.user.findUnique({
            where: { id, is_active: true }
        });

        if (!user) {
            throw new BadRequestException('User not found');
        }

        return omit(user, ['password']);
    }

    async findUserByEmail(email: string){
        const user = await this.prismaService.user.findUnique({
            where: { email, is_active: true }
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
                },
                is_active: true
            }
        });

        return user.map(u => omit(u, ['password']));
    }


    async findUserByType(type: UserType){
        const user = await this.prismaService.user.findMany({
            where: {
                type: type,
                is_active: true
            }
        });

        return user.map(u => omit(u, ['password']));
    }

    async findUserWithPassword(email: string){
        const user = await this.prismaService.user.findUnique({
            where: { email, is_active: true }
        });

        return user;
    }

    async updateUser(id: string, data: UpdateUserDto, reqUser: any) {
        if (reqUser.id !== id) {
            throw new UnauthorizedException('You can only update your own profile');
        }

        await this.validatorUser(data);
        
        const user = await this.prismaService.user.findUnique({
            where: { id, is_active: true }
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

    async activateUser(id: string) {
        const user = await this.prismaService.user.findUnique({
            where: { id, is_active: false }
        });

        if (!user) {
            throw new BadRequestException('User not found');
        }

        const updatedUser = await this.prismaService.user.update({
            where: { id },
            data: {
                is_active: true
            }
        });

        return omit(updatedUser, ['password']);
    }

    async deactivateUser(id: string, reqUser: any) {
        if (reqUser.id !== id && reqUser.type !== 'COORDINATOR') {
            console.log(reqUser.id, id);
            throw new UnauthorizedException('You can only deactivate your own profile');
        }
        const user = await this.prismaService.user.findUnique({
            where: { id, is_active: true }
        });

        if (!user) {
            throw new BadRequestException('User not found');
        }

        const updatedUser = await this.prismaService.user.update({
            where: { id },
            data: {
                is_active: false
            }
        });

        return{
            ... omit(updatedUser, ['password']),
            logout: reqUser.id === id ? true : false
        }
    }
}