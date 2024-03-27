import { UserType } from 'src/shared/enums/user_type';
import { VendorRoles } from './enum';

export interface VendorTokenPayload {
  id: number;
  email: string;
  user_type: UserType.VENDOR;
  roles: VendorRoles[];
  restaurant_id: number;
}
