import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantVendorController } from './restaurant-vendor.controller';
import { VendorModule } from '../user/vendor/vendor.module';
import { RestaurantAdminController } from './restaurant-admin.controller';
import { AdminModule } from '../user/admin/admin.module';
import { RestaurantCustomerController } from './restaurant-customer.controller';
import { CustomerModule } from '../user/customer/customer.module';

@Module({
  imports: [VendorModule, AdminModule, CustomerModule],
  controllers: [
    RestaurantAdminController,
    RestaurantVendorController,
    RestaurantCustomerController,
  ],
  providers: [RestaurantService],
})
export class RestaurantModule {}
