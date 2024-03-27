import { UserType } from 'src/shared/enums/user_type';
import { AdminRoles } from './enum';

export interface AdminTokenPayload {
  id: number;
  email: string;
  user_type: UserType.ADMIN;
  roles: AdminRoles[];
}
