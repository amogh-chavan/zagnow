import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateCustomerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @MinLength(6) // Enforce minimum password length
  password: string;
}
