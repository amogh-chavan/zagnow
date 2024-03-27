import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  Param,
} from '@nestjs/common';
import { RestaurantAdminService } from './restaurant-admin.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminRoles } from '../user/admin/enum';
import { Roles as DAdminRoles } from '../user/admin/role.decorator';
import { AuthGuard as AdminAuthGuard } from '../user/admin/auth.gaurd';
import { RoleGuard as AdminRoleGuard } from '../user/admin/role.gaurd';
import { TOKEN_NAME } from 'src/constant/variable.constant';

@ApiTags('Restaurant')
@Controller('admin/restaurant')
export class RestaurantAdminController {
  constructor(private readonly restaurantService: RestaurantAdminService) {}

  @Post()
  @DAdminRoles(AdminRoles.SUPERADMIN, AdminRoles.ADMIN)
  @UseGuards(AdminAuthGuard, AdminRoleGuard)
  @ApiBearerAuth(TOKEN_NAME)
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantService.createRestaurant(createRestaurantDto);
  }

  @Get(':id')
  @DAdminRoles(AdminRoles.SUPERADMIN, AdminRoles.ADMIN)
  @UseGuards(AdminAuthGuard, AdminRoleGuard)
  @ApiBearerAuth(TOKEN_NAME)
  findOne(@Param('id') id: string) {
    return this.restaurantService.findOne(+id);
  }

  @Patch(':id')
  @DAdminRoles(AdminRoles.SUPERADMIN, AdminRoles.ADMIN)
  @UseGuards(AdminAuthGuard, AdminRoleGuard)
  @ApiBearerAuth(TOKEN_NAME)
  update(
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    return this.restaurantService.update(+id, updateRestaurantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restaurantService.remove(+id);
  }

  @Post('/:id/review')
  @DAdminRoles(AdminRoles.SUPERADMIN, AdminRoles.ADMIN)
  @UseGuards(AdminAuthGuard, AdminRoleGuard)
  @ApiBearerAuth(TOKEN_NAME)
  createReview(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantService.createRestaurant(createRestaurantDto);
  }

  @Get('/:id/reviews')
  @DAdminRoles(AdminRoles.SUPERADMIN, AdminRoles.ADMIN)
  @UseGuards(AdminAuthGuard, AdminRoleGuard)
  @ApiBearerAuth(TOKEN_NAME)
  readRestaurantReviews(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantService.createRestaurant(createRestaurantDto);
  }

  @Patch('/review/:id')
  @DAdminRoles(AdminRoles.SUPERADMIN, AdminRoles.ADMIN)
  @UseGuards(AdminAuthGuard, AdminRoleGuard)
  @ApiBearerAuth(TOKEN_NAME)
  updateRestaurantReview(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantService.createRestaurant(createRestaurantDto);
  }

  @Delete('/review/:id')
  @DAdminRoles(AdminRoles.SUPERADMIN, AdminRoles.ADMIN)
  @UseGuards(AdminAuthGuard, AdminRoleGuard)
  @ApiBearerAuth(TOKEN_NAME)
  deleteRestaurantReview(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantService.createRestaurant(createRestaurantDto);
  }
}
