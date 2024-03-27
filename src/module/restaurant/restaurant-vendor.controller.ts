import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseGuards,
  Req,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { VendorRoles } from '../user/vendor/enum';
import { Roles as DVendorRoles } from '../user/vendor/role.decorator';
import { AuthGuard as VendorAuthGuard } from '../user/vendor/auth.gaurd';
import { RoleGuard as VendorRoleGuard } from '../user/vendor/role.gaurd';
import { TOKEN_NAME } from 'src/constant/variable.constant';
import { RequestTokenPayload } from 'src/shared/types/request';
import { VendorTokenPayload } from '../user/vendor/types';
import ApiResponse from 'src/shared/dto/api_response.dto';
import { CreateRestaurantReviewReplyDto } from './dto/create-restaurant-review-reply.dto';
import { RestaurantReviewReply } from './entities/restaurant_replies.entity';

@ApiTags('Restaurant')
@Controller('vendor/restaurant')
export class RestaurantVendorController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  @DVendorRoles(VendorRoles.OWNER)
  @UseGuards(VendorAuthGuard, VendorRoleGuard)
  @ApiBearerAuth(TOKEN_NAME)
  async create(@Body() createRestaurantDto: CreateRestaurantDto) {
    const data =
      await this.restaurantService.createRestaurant(createRestaurantDto);
    return new ApiResponse(true, data, 'Restaurant created');
  }

  @Get()
  @DVendorRoles(VendorRoles.OWNER)
  @UseGuards(VendorAuthGuard, VendorRoleGuard)
  @ApiBearerAuth(TOKEN_NAME)
  async readVendorRestaurant(@Req() request: RequestTokenPayload) {
    const { restaurant_id } = request.data as VendorTokenPayload;
    const data = await this.restaurantService.findOne(restaurant_id);
    return new ApiResponse(true, data, 'Restaurant fetched');
  }

  @Patch()
  @DVendorRoles(VendorRoles.OWNER)
  @UseGuards(VendorAuthGuard, VendorRoleGuard)
  @ApiBearerAuth(TOKEN_NAME)
  async update(
    @Req() request: RequestTokenPayload,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    const { restaurant_id } = request.data as VendorTokenPayload;
    const data = await this.restaurantService.update(
      restaurant_id,
      updateRestaurantDto,
    );
    return new ApiResponse(true, data, 'Restaurant updated');
  }

  @Get('/reviews')
  @DVendorRoles(VendorRoles.OWNER)
  @UseGuards(VendorAuthGuard, VendorRoleGuard)
  @ApiBearerAuth(TOKEN_NAME)
  async readAllReviews(@Req() request: RequestTokenPayload) {
    const { restaurant_id } = request.data as VendorTokenPayload;
    const data =
      await this.restaurantService.readRestaurantReviews(restaurant_id);
    return new ApiResponse(true, data, 'Restaurant updated');
  }

  @Post('/review/:id/reply')
  @DVendorRoles(VendorRoles.OWNER)
  @UseGuards(VendorAuthGuard, VendorRoleGuard)
  @ApiBearerAuth(TOKEN_NAME)
  async createReviewReply(
    @Req() request: RequestTokenPayload,
    @Body() createRestaurantReviewReplyDto: CreateRestaurantReviewReplyDto,
  ) {
    const { id, user_type } = request.data as VendorTokenPayload;
    const data = await this.restaurantService.createReviewReply({
      ...createRestaurantReviewReplyDto,
      user_type,
      user_id: id,
    } as RestaurantReviewReply);
    return new ApiResponse(true, data, 'Restaurant updated');
  }
}