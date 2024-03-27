import { Injectable } from '@nestjs/common';
import { AdminRoles } from './enum';

interface IsAuthorizedParams {
  currentRoles: AdminRoles[];
  requiredRoles: AdminRoles[];
}

@Injectable()
export class AccessContorlService {
  private hierarchies: Map<string, number> = new Map();
  private priority: number = 1;

  constructor() {
    this.buildRoles([AdminRoles.ADMIN, AdminRoles.SUPERADMIN]);
  }

  /**
   * The buildRoles method allows for creating a role hierarchy between specified set of roles.
   * Roles have to be specified from least privileged user to the most priviliged one
   * @param roles Array that contains list of roles
   */
  private buildRoles(roles: AdminRoles[]) {
    roles.forEach((role) => {
      this.hierarchies.set(role, this.priority);
      this.priority++;
    });
  }

  public isAuthorized({ currentRoles, requiredRoles }: IsAuthorizedParams) {
    let result = true;

    for (const requiredRole of requiredRoles) {
      let requiredRoleSatisfied = false;
      for (const currentRole of currentRoles) {
        const currentRolePriority = this.hierarchies.get(currentRole);
        const requiredRolePriority = this.hierarchies.get(requiredRole);
        if (
          currentRolePriority &&
          requiredRolePriority &&
          currentRolePriority >= requiredRolePriority
        ) {
          requiredRoleSatisfied = true;
          break;
        }

        if (!requiredRoleSatisfied) {
          result = false;
        }
      }
    }

    return result;
  }
}
