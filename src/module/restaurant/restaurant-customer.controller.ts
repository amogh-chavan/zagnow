import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard as CustomerAuthGuard } from '../user/customer/auth.gaurd';
import { TOKEN_NAME } from 'src/constant/variable.constant';
import { CreateRestaurantReviewDto } from './dto/create-restaurant-review.dto';
import { RestaurantReview } from './entities/restaurant_review.entity';
import { UpdateRestaurantReviewDto } from './dto/update-restaurant-review.dto';
import ApiResponse from 'src/shared/dto/api_response.dto';
import { RequestTokenPayload } from 'src/shared/types/request';
import { CustomerTokenPayload } from '../user/customer/types';

@ApiTags('Restaurant')
@Controller('/restaurant')
export class RestaurantCustomerController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get('/listing')
  @UseGuards(CustomerAuthGuard)
  @ApiBearerAuth(TOKEN_NAME)
  async findAll() {
    const data = await this.restaurantService.findAll();
    return new ApiResponse(true, data, 'Restaurants fetched');
  }

  @Get('/:id/reviews')
  @UseGuards(CustomerAuthGuard)
  @ApiBearerAuth(TOKEN_NAME)
  async readRestaurantReviews(@Param('id') id: string) {
    const data = await this.restaurantService.readRestaurantReviews(+id);
    return new ApiResponse(true, data, 'Restaurant reviews fetched');
  }

  @Post('/:id/review')
  @UseGuards(CustomerAuthGuard)
  @ApiBearerAuth(TOKEN_NAME)
  async createReview(
    @Req() request: RequestTokenPayload,
    @Param('id') id: string,
    @Body() createRestaurantReviewDto: CreateRestaurantReviewDto,
  ) {
    const tokenData = request.data as CustomerTokenPayload;
    const data = await this.restaurantService.createReview({
      ...createRestaurantReviewDto,
      restaurant_id: +id,
      user_id: tokenData.id,
      user_type: tokenData.user_type,
    } as RestaurantReview);
    return new ApiResponse(true, data, 'Restaurant review created');
  }

  @Patch('/review/:id')
  @UseGuards(CustomerAuthGuard)
  @ApiBearerAuth(TOKEN_NAME)
  async updateReview(
    @Req() request: RequestTokenPayload,
    @Param('id') id: string,
    @Body() updateRestaurantReviewDto: UpdateRestaurantReviewDto,
  ) {
    const tokenData = request.data as CustomerTokenPayload;
    const data = await this.restaurantService.updateReview(
      tokenData.id,
      tokenData.user_type,
      +id,
      updateRestaurantReviewDto,
    );
    return new ApiResponse(true, data, 'Restaurant review updated');
  }

  @Delete('/review/:id')
  @UseGuards(CustomerAuthGuard)
  @ApiBearerAuth(TOKEN_NAME)
  async deleteReview(
    @Req() request: RequestTokenPayload,
    @Param('id') id: string,
  ) {
    const tokenData = request.data as CustomerTokenPayload;
    const data = await this.restaurantService.removeReview(
      tokenData.id,
      tokenData.user_type,
      +id,
    );
    return new ApiResponse(true, data, 'Restaurant review deleted');
  }
}
