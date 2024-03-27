import { SetMetadata } from '@nestjs/common';
import { VendorRoles } from './enum';

export const ROLE_KEY = 'roles';

export const Roles = (...role: VendorRoles[]) => SetMetadata(ROLE_KEY, role);
