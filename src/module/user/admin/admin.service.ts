import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity'; // Import your Admin entity
import * as bcrypt from 'bcrypt'; // For secure password hashing
import { LoginAdminDto } from './dto/login-admin.dto';
import { JwtService } from '@nestjs/jwt';
import { UserType } from 'src/shared/enums/user_type';

import { AdminTokenPayload } from './types';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private jwtService: JwtService,
  ) {}

  async create(createAdminDto: CreateAdminDto): Promise<{
    id: Admin['id'];
  }> {
    const existingAdmin = await this.adminRepository.findOne({
      where: {
        email: createAdminDto.email,
        is_deleted: false,
      },
      select: ['id', 'name', 'email'],
    });
    if (existingAdmin) {
      throw new BadRequestException('Admin with given email already exists');
    }
    const newAdmin = new Admin();
    newAdmin.name = createAdminDto.name;
    newAdmin.email = createAdminDto.email;
    newAdmin.roles = createAdminDto.roles;
    // Secure password hashing before saving

    newAdmin.password = await bcrypt.hash(createAdminDto.password, 10);

    const admin = await this.adminRepository.save(newAdmin);

    return {
      id: admin.id,
    };
  }

  async findOne(id: number): Promise<Admin | undefined> {
    return this.adminRepository.findOne({
      where: {
        id,
        is_deleted: false,
      },
      select: ['id', 'name', 'email'],
    });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<void> {
    const existingAdmin = await this.adminRepository.findOne({
      where: {
        id,
        is_deleted: false,
      },
      select: ['id', 'name', 'email'],
    });

    if (!existingAdmin) {
      throw new BadRequestException('Admin not found');
    }

    existingAdmin.name = updateAdminDto.name || existingAdmin.name;

    // If password is provided, update it securely
    if (updateAdminDto.password) {
      existingAdmin.password = await bcrypt.hash(updateAdminDto.password, 10);
    }

    existingAdmin.updated_at = new Date();

    await this.adminRepository.save(existingAdmin);
    return;
  }

  async remove(id: number): Promise<void> {
    const adminToDelete = await this.adminRepository.findOne({
      where: {
        id,
        is_deleted: false,
      },
      select: ['id', 'name', 'email'],
    });
    if (adminToDelete) {
      // Consider soft deletion (set is_deleted to true) instead of permanent removal
      // await this.adminRepository.remove(adminToDelete); // For permanent deletion
      adminToDelete.is_deleted = true;
      adminToDelete.updated_at = new Date();
      await this.adminRepository.save(adminToDelete);
    }
  }

  async login(
    loginAdminDto: LoginAdminDto,
  ): Promise<{ id: number; name: string; accessToken: string }> {
    const { email, password } = loginAdminDto;

    const admin = await this.adminRepository.findOne({
      where: {
        email,
        is_deleted: false,
      },
    });

    if (!admin) {
      throw new BadRequestException('Invalid email or password');
    }

    const matched = await bcrypt.compare(password, admin.password);
    if (!matched) {
      throw new BadRequestException('Invalid email or password');
    }

    const payload: AdminTokenPayload = {
      id: admin.id,
      email: admin.email,
      user_type: UserType.ADMIN,
      roles: admin.roles,
    };
    const accessToken = this.jwtService.sign(payload);

    return { id: admin.id, name: admin.name, accessToken };
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
