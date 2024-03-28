import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateRestaurantDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  listing_name: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  business_phone: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  restaurant_address: string;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  restaurant_latitude: number;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  restaurant_longitude: number;

  @ApiProperty({ type: 'object', nullable: true })
  @IsOptional()
  restaurant_images?: object;

  @ApiProperty({ type: 'object', nullable: true })
  @IsOptional()
  menu_images?: object;
}
