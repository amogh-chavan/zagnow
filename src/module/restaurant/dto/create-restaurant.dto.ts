import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRestaurantDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  listing_name: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  business_phone: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  restaurant_address: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  restaurant_latitude: number;

  @IsNotEmpty()
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
