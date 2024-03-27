import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CustomerModule } from './customer/customer.module';
import { AdminModule } from './admin/admin.module';
import { VendorModule } from './vendor/vendor.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [CustomerModule, AdminModule, VendorModule],
})
export class UserModule {}
