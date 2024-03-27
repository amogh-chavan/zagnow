import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsString } from 'class-validator';

export class CreateRestaurantReviewReplyDto {
  @ApiProperty({ description: 'ID of the restaurant review being replied to' })
  @IsInt()
  @IsNotEmpty()
  restaurant_review_id: number;

  @ApiProperty({ description: 'Comment for the review reply' })
  @IsString()
  @IsNotEmpty()
  comment: string;
}
