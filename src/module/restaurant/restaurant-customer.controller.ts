import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard as CustomerAuthGuard } from '../user/customer/auth.gaurd';
import { TOKEN_NAME } from 'src/constant/variable.constant';

@ApiTags('Restaurant')
@Controller('/restaurant')
export class RestaurantCustomerController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get('/listing')
  @UseGuards(CustomerAuthGuard)
  @ApiBearerAuth(TOKEN_NAME)
  findAll() {
    return this.restaurantService.findAll();
  }

  @Get('/:id/reviews')
  @UseGuards(CustomerAuthGuard)
  @ApiBearerAuth(TOKEN_NAME)
  readRestaurantReviews() {
    return this.restaurantService.findAll();
  }

  @Post('/review')
  @UseGuards(CustomerAuthGuard)
  @ApiBearerAuth(TOKEN_NAME)
  createReview() {
    return this.restaurantService.findAll();
  }

  @Patch('/review/:id')
  @UseGuards(CustomerAuthGuard)
  @ApiBearerAuth(TOKEN_NAME)
  updateReview() {
    return this.restaurantService.findAll();
  }

  @Delete('/review/:id')
  @UseGuards(CustomerAuthGuard)
  @ApiBearerAuth(TOKEN_NAME)
  deleteReview() {
    return this.restaurantService.findAll();
  }
}
