import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateRestaurantReviewDto {
  @ApiProperty({ description: 'Comment about the restaurant' })
  @IsString()
  @IsNotEmpty()
  comment?: string;
}
