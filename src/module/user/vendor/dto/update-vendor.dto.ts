import { IsNotEmpty, IsNumber, MinLength } from 'class-validator';

export class UpdateVendorDto {
  @IsNotEmpty()
  @IsNumber()
  name: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
