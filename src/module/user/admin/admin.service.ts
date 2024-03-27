import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity'; // Import your Admin entity
import * as bcrypt from 'bcrypt'; // For secure password hashing

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const newAdmin = new Admin();
    newAdmin.name = createAdminDto.name;
    newAdmin.email = createAdminDto.email;

    // Secure password hashing before saving
    const salt = await bcrypt.genSalt(10); // Adjust salt rounds as needed
    newAdmin.password = await bcrypt.hash(createAdminDto.password, salt);

    return await this.adminRepository.save(newAdmin);
  }

  findAll(): Promise<Admin[]> {
    return this.adminRepository.find();
  }

  findOne(id: number): Promise<Admin | undefined> {
    return this.adminRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    updateAdminDto: UpdateAdminDto,
  ): Promise<Admin | undefined> {
    const existingAdmin = await this.adminRepository.findOne({
      where: {
        id,
      },
    });
    if (!existingAdmin) {
      return undefined;
    }

    existingAdmin.name = updateAdminDto.name || existingAdmin.name;

    // If password is provided, update it securely
    if (updateAdminDto.password) {
      const salt = await bcrypt.genSalt(10);
      existingAdmin.password = await bcrypt.hash(updateAdminDto.password, salt);
    }

    return await this.adminRepository.save(existingAdmin);
  }

  async remove(id: number): Promise<void> {
    const adminToDelete = await this.adminRepository.findOne({
      where: {
        id,
      },
    });
    if (adminToDelete) {
      // Consider soft deletion (set is_deleted to true) instead of permanent removal
      // await this.adminRepository.remove(adminToDelete); // For permanent deletion
      adminToDelete.is_deleted = true;
      await this.adminRepository.save(adminToDelete);
    }
  }
}
