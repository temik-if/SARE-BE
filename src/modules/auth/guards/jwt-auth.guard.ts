import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
    constructor(private readonly prismaService: PrismaService, private reflector: Reflector) {
        super();
    }

    async canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest();
  
      const isAuthValid = await super.canActivate(context);
  
      if (!isAuthValid) return false;
  
      if (!request.user) {
          throw new UnauthorizedException('User not authenticated');
      }

      const dbUser = await this.prismaService.user.findUnique({
          where: { id: request.user.id },
      });
  
      if (!dbUser || !dbUser.is_active) {
          throw new UnauthorizedException('User is inactive');
      }
  
      return true;
  }  
}