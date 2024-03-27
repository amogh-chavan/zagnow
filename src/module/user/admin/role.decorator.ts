import { SetMetadata } from '@nestjs/common';
import { AdminRoles } from './enum';

export const ROLE_KEY = 'roles';

export const Roles = (...role: AdminRoles[]) => SetMetadata(ROLE_KEY, role);
