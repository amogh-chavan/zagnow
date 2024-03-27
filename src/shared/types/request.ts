import { Request } from '@nestjs/common';
import { AdminTokenPayload } from 'src/module/user/admin/types';
import { CustomerTokenPayload } from 'src/module/user/customer/types';
import { VendorTokenPayload } from 'src/module/user/vendor/types';

export interface RequestTokenPayload extends Request {
  data: VendorTokenPayload | AdminTokenPayload | CustomerTokenPayload;
}
