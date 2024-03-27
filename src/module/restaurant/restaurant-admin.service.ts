import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantReview } from './entities/restaurant_review.entity';
import { RestaurantReviewReply } from './entities/restaurant_replies.entity';

@Injectable()
export class RestaurantAdminService {
  constructor(
    @InjectRepository(RestaurantReview)
    private readonly restaurantReview: Repository<RestaurantReview>,

    @InjectRepository(RestaurantReviewReply)
    private readonly restaurantReviewReply: Repository<RestaurantReviewReply>,

    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {}

  async createRestaurant(
    createRestaurantDto: CreateRestaurantDto,
  ): Promise<Restaurant> {
    const restaurant = this.restaurantRepository.create(createRestaurantDto);
    return await this.restaurantRepository.save(restaurant);
  }

  async findAll(): Promise<Restaurant[]> {
    return await this.restaurantRepository.find();
  }

  async findOne(id: number): Promise<Restaurant | undefined> {
    return await this.restaurantRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    updateRestaurantDto: UpdateRestaurantDto,
  ): Promise<Restaurant> {
    const restaurant = await this.findOne(id);
    if (!restaurant) {
      throw new BadRequestException('Restaurant Not Found');
    }
    this.restaurantRepository.merge(restaurant, updateRestaurantDto);
    return await this.restaurantRepository.save(restaurant);
  }

  async remove(id: number): Promise<void> {
    await this.restaurantRepository.delete(id);
  }

  async readRestaurantReviews(
    restaurant_id: number,
  ): Promise<RestaurantReview[]> {
    return await this.restaurantReview.find({
      where: {
        restaurant_id,
      },
    });
  }

  async createReviewReply(
    review_reply: RestaurantReviewReply,
  ): Promise<RestaurantReviewReply> {
    const restaurant_review_reply =
      this.restaurantReviewReply.create(review_reply);
    return await this.restaurantReviewReply.save(restaurant_review_reply);
  }
}
