import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantVendorController } from './restaurant-vendor.controller';
import { VendorModule } from '../user/vendor/vendor.module';
import { RestaurantAdminController } from './restaurant-admin.controller';
import { AdminModule } from '../user/admin/admin.module';
import { RestaurantCustomerController } from './restaurant-customer.controller';
import { CustomerModule } from '../user/customer/customer.module';

import { RestaurantReview } from './entities/restaurant_review.entity';
import { RestaurantReviewReply } from './entities/restaurant_replies.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Restaurant,
      RestaurantReview,
      RestaurantReviewReply,
    ]),
    VendorModule,
    AdminModule,
    CustomerModule,
  ],
  controllers: [
    RestaurantAdminController,
    RestaurantVendorController,
    RestaurantCustomerController,
  ],
  providers: [RestaurantService, RestaurantReview, RestaurantReviewReply],
})
export class RestaurantModule {}
