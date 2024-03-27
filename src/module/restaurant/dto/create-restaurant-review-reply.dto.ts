import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRestaurantReviewReplyDto {
  @ApiProperty({ description: 'Comment for the review reply' })
  @IsString()
  @IsNotEmpty()
  comment: string;
}
