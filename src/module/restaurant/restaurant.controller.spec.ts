import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantVendorController } from './restaurant-vendor.controller';
import { RestaurantService } from './restaurant.service';

describe('RestaurantController', () => {
  let controller: RestaurantVendorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantVendorController],
      providers: [RestaurantService],
    }).compile();

    controller = module.get<RestaurantVendorController>(
      RestaurantVendorController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
