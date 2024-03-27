import { Module } from '@nestjs/common';
import { RestaurantVendorService } from './restaurant-vendor.service';
import { RestaurantVendorController } from './restaurant-vendor.controller';
import { VendorModule } from '../user/vendor/vendor.module';
import { RestaurantAdminController } from './restaurant-admin.controller';
import { AdminModule } from '../user/admin/admin.module';
import { RestaurantCustomerController } from './restaurant-customer.controller';
import { CustomerModule } from '../user/customer/customer.module';
import { RestaurantAdminService } from './restaurant-admin.service';
import { RestaurantCustomerService } from './restaurant-customer.service';

@Module({
  imports: [VendorModule, AdminModule, CustomerModule],
  controllers: [
    RestaurantAdminController,
    RestaurantVendorController,
    RestaurantCustomerController,
  ],
  providers: [
    RestaurantVendorService,
    RestaurantAdminService,
    RestaurantCustomerService,
  ],
})
export class RestaurantModule {}
