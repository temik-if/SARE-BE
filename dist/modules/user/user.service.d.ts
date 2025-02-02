import { PrismaService } from "src/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import type { UpdateUserDto } from "./dto/update-user.dto";
export declare class UserService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    private validatorUser;
    createUser(data: CreateUserDto): Promise<import("lodash").Omit<{
        id: string;
        email: string;
        first_name: string;
        last_name: string;
        full_name: string;
        password: string;
        is_active: boolean;
        type: import(".prisma/client").$Enums.UserType;
        createdAt: Date;
        updatedAt: Date;
    }, "password">>;
    getAllUsers(): Promise<import("lodash").Omit<{
        id: string;
        email: string;
        first_name: string;
        last_name: string;
        full_name: string;
        password: string;
        is_active: boolean;
        type: import(".prisma/client").$Enums.UserType;
        createdAt: Date;
        updatedAt: Date;
    }, "password">[]>;
    findUserById(id: string): Promise<import("lodash").Omit<{
        id: string;
        email: string;
        first_name: string;
        last_name: string;
        full_name: string;
        password: string;
        is_active: boolean;
        type: import(".prisma/client").$Enums.UserType;
        createdAt: Date;
        updatedAt: Date;
    }, "password">>;
    findUserByEmail(email: string): Promise<import("lodash").Omit<{
        id: string;
        email: string;
        first_name: string;
        last_name: string;
        full_name: string;
        password: string;
        is_active: boolean;
        type: import(".prisma/client").$Enums.UserType;
        createdAt: Date;
        updatedAt: Date;
    }, "password">>;
    findUserByName(name: string): Promise<import("lodash").Omit<{
        id: string;
        email: string;
        first_name: string;
        last_name: string;
        full_name: string;
        password: string;
        is_active: boolean;
        type: import(".prisma/client").$Enums.UserType;
        createdAt: Date;
        updatedAt: Date;
    }, "password">[]>;
    updateUser(id: string, data: UpdateUserDto): Promise<import("lodash").Omit<{
        id: string;
        email: string;
        first_name: string;
        last_name: string;
        full_name: string;
        password: string;
        is_active: boolean;
        type: import(".prisma/client").$Enums.UserType;
        createdAt: Date;
        updatedAt: Date;
    }, "password">>;
    deleteUser(id: string): Promise<import("lodash").Omit<{
        id: string;
        email: string;
        first_name: string;
        last_name: string;
        full_name: string;
        password: string;
        is_active: boolean;
        type: import(".prisma/client").$Enums.UserType;
        createdAt: Date;
        updatedAt: Date;
    }, "password">>;
}
