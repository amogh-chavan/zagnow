import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { VendorRoles } from '../enum';

export class CreateVendorDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsArray() // Validate as an array
  @ApiProperty()
  roles: VendorRoles[];

  @IsNotEmpty()
  @MinLength(6) // Enforce minimum password length
  @ApiProperty()
  password: string;

  // Custom validation method
  validateRoles(roles: string[]) {
    if (
      !roles.every((role) =>
        Object.values(VendorRoles).includes(role as VendorRoles),
      )
    ) {
      throw new Error('Invalid role: Roles must be from the VendorRoles enum');
    }
  }
}
