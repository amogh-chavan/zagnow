import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantReview } from './entities/restaurant_review.entity';
import { RestaurantReviewReply } from './entities/restaurant_replies.entity';
import { UpdateRestaurantReviewDto } from './dto/update-restaurant-review.dto';
import { UpdateRestaurantReviewReplyDto } from './dto/update-restaurant-review-reply.dto';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,

    @InjectRepository(RestaurantReview)
    private readonly restaurantReviewRepository: Repository<RestaurantReview>,

    @InjectRepository(RestaurantReviewReply)
    private readonly restaurantReviewReplyRepository: Repository<RestaurantReviewReply>,
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
    const restaurantToDelete = await this.restaurantRepository.findOne({
      where: {
        id,
        is_deleted: false,
      },
      select: ['id'],
    });
    if (restaurantToDelete) {
      restaurantToDelete.is_deleted = true;
      await this.restaurantRepository.save(restaurantToDelete);
    }
  }

  async readRestaurantReviews(
    restaurant_id: number,
  ): Promise<RestaurantReview[]> {
    return await this.restaurantReviewRepository.find({
      where: {
        restaurant_id,
      },
    });
  }

  async createReview(review: RestaurantReview): Promise<RestaurantReview> {
    const restaurant = await this.restaurantRepository.findOne({
      where: {
        id: review.restaurant_id,
        is_deleted: false,
      },
    });
    if (!restaurant) {
      throw new BadRequestException('Restaurant not found');
    }
    console.log({ review });
    const restaurant_review = this.restaurantReviewRepository.create(review);
    return await this.restaurantReviewRepository.save(restaurant_review);
  }

  async updateReview(
    id: number,
    updateRestaurantReviewDto: UpdateRestaurantReviewDto,
  ): Promise<RestaurantReview> {
    const restaurantReview = await this.restaurantReviewRepository.findOne({
      where: {
        id,
      },
    });
    if (!restaurantReview) {
      throw new BadRequestException('Restaurant Review Not Found');
    }
    this.restaurantReviewRepository.merge(
      restaurantReview,
      updateRestaurantReviewDto,
    );
    return await this.restaurantReviewRepository.save(restaurantReview);
  }

  async removeReview(id: number): Promise<void> {
    const restaurantReviewToDelete =
      await this.restaurantReviewRepository.findOne({
        where: {
          id,
          is_deleted: false,
        },
        select: ['id'],
      });
    if (restaurantReviewToDelete) {
      restaurantReviewToDelete.is_deleted = true;
      await this.restaurantReviewRepository.save(restaurantReviewToDelete);
    }
  }

  async createReviewReply(
    review_reply: RestaurantReviewReply,
  ): Promise<RestaurantReviewReply> {
    const restaurant = await this.restaurantReviewRepository.findOne({
      where: {
        id: review_reply.id,
        is_deleted: false,
      },
    });
    if (!restaurant) {
      throw new BadRequestException('Restaurant not found');
    }
    console.log({ review_reply });
    const restaurantReviewReply =
      this.restaurantReviewReplyRepository.create(review_reply);
    console.log({ restaurantReviewReply });
    return await this.restaurantReviewReplyRepository.save(
      restaurantReviewReply,
    );
  }

  async updateReviewReply(
    id: number,
    updateRestaurantReviewReplyDto: UpdateRestaurantReviewReplyDto,
  ): Promise<RestaurantReview> {
    const restaurantReviewReply =
      await this.restaurantReviewReplyRepository.findOne({
        where: {
          id,
        },
      });
    if (!restaurantReviewReply) {
      throw new BadRequestException('Restaurant Review Reply Not Found');
    }
    this.restaurantReviewReplyRepository.merge(
      restaurantReviewReply,
      updateRestaurantReviewReplyDto,
    );
    return await this.restaurantReviewRepository.save(restaurantReviewReply);
  }

  async removeReviewReply(id: number): Promise<void> {
    const restaurantReviewReplyToDelete =
      await this.restaurantReviewReplyRepository.findOne({
        where: {
          id,
          is_deleted: false,
        },
        select: ['id'],
      });
    if (restaurantReviewReplyToDelete) {
      restaurantReviewReplyToDelete.is_deleted = true;
      await this.restaurantReviewReplyRepository.save(
        restaurantReviewReplyToDelete,
      );
    }
  }
}
