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

@ApiTags('Restaurant')
@Controller('vendor/restaurant')
export class RestaurantVendorController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  @DVendorRoles(VendorRoles.OWNER)
  @UseGuards(VendorAuthGuard, VendorRoleGuard)
  @ApiBearerAuth(TOKEN_NAME)
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantService.create(createRestaurantDto);
  }

  @Get()
  @DVendorRoles(VendorRoles.OWNER)
  @UseGuards(VendorAuthGuard, VendorRoleGuard)
  @ApiBearerAuth(TOKEN_NAME)
  findOne(@Req() request: RequestTokenPayload) {
    const { restaurant_id } = request.data as VendorTokenPayload;
    return this.restaurantService.findOne(restaurant_id);
  }

  @Patch()
  @DVendorRoles(VendorRoles.OWNER)
  @UseGuards(VendorAuthGuard, VendorRoleGuard)
  @ApiBearerAuth(TOKEN_NAME)
  update(
    @Req() request: RequestTokenPayload,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    const { restaurant_id } = request.data as VendorTokenPayload;
    return this.restaurantService.update(restaurant_id, updateRestaurantDto);
  }

  @Get('/reviews')
  @DVendorRoles(VendorRoles.OWNER)
  @UseGuards(VendorAuthGuard, VendorRoleGuard)
  @ApiBearerAuth(TOKEN_NAME)
  readAllReviews(@Req() request: RequestTokenPayload) {
    const { restaurant_id } = request.data as VendorTokenPayload;
    return this.restaurantService.findOne(restaurant_id);
  }

  @Post('/review/:id/reply')
  @DVendorRoles(VendorRoles.OWNER)
  @UseGuards(VendorAuthGuard, VendorRoleGuard)
  @ApiBearerAuth(TOKEN_NAME)
  createReviewReply(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantService.create(createRestaurantDto);
  }
}
