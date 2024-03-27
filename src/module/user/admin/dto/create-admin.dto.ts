import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { AdminRoles } from '../enum';

export class CreateAdminDto {
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
  roles: AdminRoles[];

  @IsNotEmpty()
  @MinLength(6) // Enforce minimum password length
  @ApiProperty()
  password: string;

  // Custom validation method
  validateRoles(roles: string[]) {
    if (
      !roles.every((role) =>
        Object.values(AdminRoles).includes(role as AdminRoles),
      )
    ) {
      throw new Error('Invalid role: Roles must be from the AdminRoles enum');
    }
  }
}
