import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { UserType } from 'src/shared/enums/user_type';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly adminService: AdminService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization }: any = request.headers;
    if (!authorization || authorization.trim() === '') {
      throw new UnauthorizedException('Authorization Error');
    }
    const authToken = authorization.replace(/bearer/gim, '').trim();
    const data = await this.adminService.validateToken(authToken);
    if (data.user_type !== UserType.ADMIN) {
      throw new UnauthorizedException('Authorization Error');
    }
    request.data = data;
    return true;
  }
}
