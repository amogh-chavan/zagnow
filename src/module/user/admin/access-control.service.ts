import { Injectable } from '@nestjs/common';
import { AdminRoles } from './enum';

// Interface defining the parameters for checking authorization
interface IsAuthorizedParams {
  currentRoles: AdminRoles[]; // Roles currently possessed by the user
  requiredRoles: AdminRoles[]; // Roles required to access a resource
}

@Injectable()
export class AccessContorlService {
  private hierarchies: Map<string, number> = new Map(); // Map to store role hierarchies
  private priority: number = 1; // Priority counter for role hierarchies

  constructor() {
    // Initialize the role hierarchy with default roles
    this.buildRoles([AdminRoles.ADMIN, AdminRoles.SUPERADMIN]);
  }

  // Method to build role hierarchies
  private buildRoles(roles: AdminRoles[]) {
    roles.forEach((role) => {
      this.hierarchies.set(role, this.priority); // Assign priority to each role
      this.priority++; // Increment priority counter
    });
  }

  // Method to check if the user is authorized based on their roles
  public isAuthorized({ currentRoles, requiredRoles }: IsAuthorizedParams) {
    let result = false; // Default result is unauthorized

    // Loop through each required role
    for (const requiredRole of requiredRoles) {
      // Loop through each current role of the user
      for (const currentRole of currentRoles) {
        // Get priority of current and required roles from the hierarchy map
        const currentRolePriority = this.hierarchies.get(currentRole);
        const requiredRolePriority = this.hierarchies.get(requiredRole);

        // If both roles exist and current role has equal or higher priority than required role
        if (
          currentRolePriority &&
          requiredRolePriority &&
          currentRolePriority >= requiredRolePriority
        ) {
          result = true; // User is authorized
          break; // No need to check further, exit loop
        }
      }

      // If user is authorized, no need to check further required roles
      if (result) {
        break;
      }
    }

    return result; // Return authorization result
  }
}
