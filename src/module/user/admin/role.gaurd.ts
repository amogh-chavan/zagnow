import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLE_KEY } from './role.decorator';
import { AccessContorlService } from './access-control.service';
import { AdminTokenPayload } from './types';
import { AdminRoles } from './enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private accessControlService: AccessContorlService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<AdminRoles[]>(
      ROLE_KEY,
      [context.getHandler(), context.getClass()],
    );

    const request = context.switchToHttp().getRequest();
    const data: AdminTokenPayload = request['data'];

    const result = this.accessControlService.isAuthorized({
      requiredRoles,
      currentRoles: data.roles,
    });

    if (result) {
      return true;
    }

    return false;
  }
}
