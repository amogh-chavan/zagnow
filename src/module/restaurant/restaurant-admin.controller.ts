import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  Param,
  Req,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminRoles } from '../user/admin/enum';
import { Roles as DAdminRoles } from '../user/admin/role.decorator';
import { AuthGuard as AdminAuthGuard } from '../user/admin/auth.gaurd';
import { RoleGuard as AdminRoleGuard } from '../user/admin/role.gaurd';
import { TOKEN_NAME } from 'src/constant/variable.constant';
import { CreateRestaurantReviewDto } from './dto/create-restaurant-review.dto';
import { RestaurantReview } from './entities/restaurant_review.entity';
import { UpdateRestaurantReviewDto } from './dto/update-restaurant-review.dto';
import ApiResponse from 'src/shared/dto/api_response.dto';
import { RequestTokenPayload } from 'src/shared/types/request';
import { AdminTokenPayload } from '../user/admin/types';

@ApiTags('Restaurant')
@Controller('admin/restaurant')
export class RestaurantAdminController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  @DAdminRoles(AdminRoles.SUPERADMIN, AdminRoles.ADMIN)
  @UseGuards(AdminAuthGuard, AdminRoleGuard)
  @ApiBearerAuth(TOKEN_NAME)
  async create(@Body() createRestaurantDto: CreateRestaurantDto) {
    const data =
      await this.restaurantService.createRestaurant(createRestaurantDto);
    return new ApiResponse(true, data, 'Restaurant created');
  }

  @Get(':id')
  @DAdminRoles(AdminRoles.SUPERADMIN, AdminRoles.ADMIN)
  @UseGuards(AdminAuthGuard, AdminRoleGuard)
  @ApiBearerAuth(TOKEN_NAME)
  async findOne(@Param('id') id: string) {
    const data = await this.restaurantService.findOne(+id);
    return new ApiResponse(true, data, 'Restaurant fetched');
  }

  @Patch(':id')
  @DAdminRoles(AdminRoles.SUPERADMIN, AdminRoles.ADMIN)
  @UseGuards(AdminAuthGuard, AdminRoleGuard)
  @ApiBearerAuth(TOKEN_NAME)
  async update(
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    const data = await this.restaurantService.update(+id, updateRestaurantDto);
    return new ApiResponse(true, data, 'Restaurant updated');
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.restaurantService.remove(+id);
    return new ApiResponse(true, data, 'Restaurant deleted');
  }

  @Post('/:id/review')
  @DAdminRoles(AdminRoles.SUPERADMIN, AdminRoles.ADMIN)
  @UseGuards(AdminAuthGuard, AdminRoleGuard)
  @ApiBearerAuth(TOKEN_NAME)
  async createReview(
    @Req() request: RequestTokenPayload,
    @Param('id') id: string,
    @Body() createRestaurantReviewDto: CreateRestaurantReviewDto,
  ) {
    const tokenData = request.data as AdminTokenPayload;
    const data = await this.restaurantService.createReview({
      ...createRestaurantReviewDto,
      restaurant_id: +id,
      user_id: tokenData.id,
      user_type: tokenData.user_type,
    } as RestaurantReview);
    return new ApiResponse(true, data, 'Restaurant review created');
  }

  @Get('/:id/reviews')
  @DAdminRoles(AdminRoles.SUPERADMIN, AdminRoles.ADMIN)
  @UseGuards(AdminAuthGuard, AdminRoleGuard)
  @ApiBearerAuth(TOKEN_NAME)
  async readRestaurantReviews(@Param('id') id: string) {
    const data = await this.restaurantService.readRestaurantReviews(+id);
    return new ApiResponse(true, data, 'Restaurant reviews fetched');
  }

  @Patch('/review/:id')
  @DAdminRoles(AdminRoles.SUPERADMIN, AdminRoles.ADMIN)
  @UseGuards(AdminAuthGuard, AdminRoleGuard)
  @ApiBearerAuth(TOKEN_NAME)
  async updateReview(
    @Req() request: RequestTokenPayload,
    @Param('id') id: string,
    @Body() updateRestaurantReviewDto: UpdateRestaurantReviewDto,
  ) {
    const tokenData = request.data as AdminTokenPayload;
    const data = await this.restaurantService.updateReview(
      tokenData.id,
      tokenData.user_type,
      +id,
      updateRestaurantReviewDto,
    );
    return new ApiResponse(true, data, 'Restaurant review updated');
  }

  @Delete('/review/:id')
  @DAdminRoles(AdminRoles.SUPERADMIN, AdminRoles.ADMIN)
  @UseGuards(AdminAuthGuard, AdminRoleGuard)
  @ApiBearerAuth(TOKEN_NAME)
  async deleteReview(
    @Req() request: RequestTokenPayload,
    @Param('id') id: string,
  ) {
    const tokenData = request.data as AdminTokenPayload;
    const data = await this.restaurantService.removeReview(
      tokenData.id,
      tokenData.user_type,
      +id,
    );
    return new ApiResponse(true, data, 'Restaurant review deleted');
  }
}
