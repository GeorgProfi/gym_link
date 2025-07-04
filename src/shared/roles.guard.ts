import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ERole } from './enums/role.enum';
import { User } from '../entity/user.entity';
import { IncorrectRoleException } from './exceptions/roleException.exception';

@Injectable()
export class RolesGuard implements CanActivate {
    private logger: Logger = new Logger(RolesGuard.name);

    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<ERole[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ]);
        console.log(requiredRoles)
        Logger.verbose(requiredRoles)
        if (!requiredRoles) {
            return true;
        }
        // const { user }: { user: User } = context.switchToHttp().getRequest();
        // //console.log(context.switchToHttp().getRequest())
        // console.log(user.role === 'admin')
        // console.log(user.)

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        console.log(user)
        if (user.role === ERole.admin) return true;

        return requiredRoles.some((role) => {
            return user.role === role;
        });
    }
}
