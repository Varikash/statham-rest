import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const token = request.headers['authorization'];

        if (!token || token !== `Bearer ${process.env.ACCESS_TOKEN}`) {
            throw new UnauthorizedException('Invalid or missing token');
        }

        return true;
    }
}