import { UserService } from "./user.service";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from "./dto/update-user.dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
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
    getAllUsers(): Promise<{
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
    }[]>;
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
