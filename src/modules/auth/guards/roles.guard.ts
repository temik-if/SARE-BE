import { ForbiddenException, Injectable, type CanActivate, type ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import type { UserType } from "@prisma/client";
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());

        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest<Request>();
        const user = request.user as { type: UserType };

        if (!user) {
            return false;
        }

        if (!requiredRoles.includes(user.type)) {
            throw new ForbiddenException('You do not have permission to access this resource');
        }

        return true;
    }
}