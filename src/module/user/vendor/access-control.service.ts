import { Injectable } from '@nestjs/common';
import { VendorRoles } from './enum';

// Interface defining the parameters for checking authorization
interface IsAuthorizedParams {
  currentRoles: VendorRoles[]; // Roles currently possessed by the user
  requiredRoles: VendorRoles[]; // Roles required to access a resource
}

@Injectable()
export class AccessContorlService {
  private hierarchies: Map<string, number> = new Map(); // Map to store role hierarchies
  private priority: number = 1; // Priority counter for role hierarchies

  constructor() {
    // Initialize the role hierarchy with default roles
    this.buildRoles([VendorRoles.MANAGER, VendorRoles.OWNER]);
  }

  /**
   * The buildRoles method allows for creating a role hierarchy between specified set of roles.
   * Roles have to be specified from least privileged user to the most priviliged one
   * @param roles Array that contains list of roles
   */
  private buildRoles(roles: VendorRoles[]) {
    // Loop through each role and assign a priority level to it
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
      // If user is authorized, break
      if (result) {
        break;
      }
    }

    return result; // Return authorization result
  }
}
