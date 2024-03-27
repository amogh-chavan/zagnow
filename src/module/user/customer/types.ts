import { UserType } from 'src/shared/enums/user_type';

export interface CustomerTokenPayload {
  id: number;
  email: string;
  user_type: UserType.CUSTOMER;
}
