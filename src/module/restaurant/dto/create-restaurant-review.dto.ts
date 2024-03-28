import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  Max,
  IsNumber,
} from 'class-validator';

export class CreateRestaurantReviewDto {
  @ApiProperty({ description: 'Rating for the restaurant (1-5)' })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({ description: 'Comment about the restaurant' })
  @IsString()
  @IsOptional()
  comment?: string;
}
