import { CreateUserDto } from './create-user.dto';
import type { UserType } from '@prisma/client';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    type?: UserType;
}
export {};
