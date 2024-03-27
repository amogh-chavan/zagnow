import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { VendorService } from './vendor.service';
import { UserType } from 'src/shared/enums/user_type';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly vendorService: VendorService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization }: any = request.headers;
    if (!authorization || authorization.trim() === '') {
      throw new UnauthorizedException('Authorization Error');
    }
    const authToken = authorization.replace(/bearer/gim, '').trim();
    const data = await this.vendorService.validateToken(authToken);
    if (data.user_type !== UserType.ADMIN) {
      throw new UnauthorizedException('Authorization Error');
    }
    request.data = data;
    return true;
  }
}
