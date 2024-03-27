import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsInt, MinLength } from 'class-validator';

export class CreateVendorDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  restaurant_id: number;
}
