import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateVendorDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  restaurant_id: number;

  @IsOptional()
  @MinLength(6) // Enforce minimum password length
  @ApiProperty()
  password: string;
}
