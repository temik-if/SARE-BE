import { UserType } from "@prisma/client";
export declare class CreateUserDto {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    type: UserType;
}
