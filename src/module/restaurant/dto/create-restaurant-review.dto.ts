import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsString,
  Min,
  Max,
} from 'class-validator';

export class CreateRestaurantReviewDto {
  @ApiProperty({
    description:
      'ID of the restaurant being reviewed (optional for vendor reviews)',
  })
  @IsOptional()
  @IsInt()
  restaurant_id?: number;

  @ApiProperty({ description: 'Rating for the restaurant (1-5)' })
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({ description: 'Comment about the restaurant' })
  @IsString()
  @IsOptional()
  comment?: string;
}
