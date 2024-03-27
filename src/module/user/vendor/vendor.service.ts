import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { Vendor } from './entities/vendor.entity'; // Import your Vendor entity
import * as bcrypt from 'bcrypt'; // For secure password hashing
import { LoginVendorDto } from './dto/login-vendor.dto';
import { JwtService } from '@nestjs/jwt';
import { UserType } from 'src/shared/enums/user_type';

import { VendorTokenPayload } from './types';

@Injectable()
export class VendorService {
  constructor(
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,
    private jwtService: JwtService,
  ) {}

  async create(createVendorDto: CreateVendorDto): Promise<{
    id: Vendor['id'];
  }> {
    const existingVendor = await this.vendorRepository.findOne({
      where: {
        email: createVendorDto.email,
        is_deleted: false,
      },
      select: ['id', 'name', 'email'],
    });
    console.log({ existingVendor });
    if (existingVendor) {
      throw new BadRequestException('Vendor with given email already exists');
    }
    const newVendor = new Vendor();
    newVendor.name = createVendorDto.name;
    newVendor.email = createVendorDto.email;
    newVendor.roles = createVendorDto.roles;
    // Secure password hashing before saving

    newVendor.password = await bcrypt.hash(createVendorDto.password, 10);

    const vendor = await this.vendorRepository.save(newVendor);

    return {
      id: vendor.id,
    };
  }

  async findOne(id: number): Promise<Vendor | undefined> {
    return this.vendorRepository.findOne({
      where: {
        id,
        is_deleted: false,
      },
      select: ['id', 'name', 'email'],
    });
  }

  async update(id: number, updateVendorDto: UpdateVendorDto): Promise<void> {
    const existingVendor = await this.vendorRepository.findOne({
      where: {
        id,
        is_deleted: false,
      },
      select: ['id', 'name', 'email'],
    });

    if (!existingVendor) {
      throw new BadRequestException('Vendor not found');
    }

    existingVendor.name = updateVendorDto.name || existingVendor.name;

    // If password is provided, update it securely
    if (updateVendorDto.password) {
      existingVendor.password = await bcrypt.hash(updateVendorDto.password, 10);
    }

    await this.vendorRepository.save(existingVendor);
    return;
  }

  async remove(id: number): Promise<void> {
    const vendorToDelete = await this.vendorRepository.findOne({
      where: {
        id,
        is_deleted: false,
      },
      select: ['id', 'name', 'email'],
    });
    if (vendorToDelete) {
      // Consider soft deletion (set is_deleted to true) instead of permanent removal
      // await this.vendorRepository.remove(vendorToDelete); // For permanent deletion
      vendorToDelete.is_deleted = true;
      await this.vendorRepository.save(vendorToDelete);
    }
  }

  async login(
    loginVendorDto: LoginVendorDto,
  ): Promise<{ id: number; name: string; accessToken: string }> {
    const { email, password } = loginVendorDto;

    const vendor = await this.vendorRepository.findOne({
      where: {
        email,
        is_deleted: false,
      },
    });

    if (!vendor) {
      throw new BadRequestException('Invalid email or password');
    }

    const matched = await bcrypt.compare(password, vendor.password);
    if (!matched) {
      throw new BadRequestException('Invalid email or password');
    }

    const payload: VendorTokenPayload = {
      id: vendor.id,
      email: vendor.email,
      user_type: UserType.VENDOR,
      roles: vendor.roles,
      restaurant_id: vendor.restaurant_id,
    };
    const accessToken = this.jwtService.sign(payload);

    return { id: vendor.id, name: vendor.name, accessToken };
  }

  async validateToken(token: string) {
    try {
      const data: any = await this.jwtService.verifyAsync(token);

      return data;
    } catch (error) {
      throw new UnauthorizedException('Authorization Error');
    }
  }
}
