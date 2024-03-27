import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity'; // Import your Customer entity
import * as bcrypt from 'bcrypt'; // For secure password hashing
import { LoginCustomerDto } from './dto/login-customer.dto';
import { JwtService } from '@nestjs/jwt';
import { UserType } from 'src/shared/enums/user_type';

import { CustomerTokenPayload } from './types';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private jwtService: JwtService,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<{
    id: Customer['id'];
  }> {
    const existingCustomer = await this.customerRepository.findOne({
      where: {
        email: createCustomerDto.email,
        is_deleted: false,
      },
      select: ['id', 'name', 'email'],
    });
    console.log({ existingCustomer });
    if (existingCustomer) {
      throw new BadRequestException('Customer with given email already exists');
    }
    const newCustomer = new Customer();
    newCustomer.name = createCustomerDto.name;
    newCustomer.email = createCustomerDto.email;

    // Secure password hashing before saving

    newCustomer.password = await bcrypt.hash(createCustomerDto.password, 10);

    const customer = await this.customerRepository.save(newCustomer);

    return {
      id: customer.id,
    };
  }

  async findOne(id: number): Promise<Customer | undefined> {
    return this.customerRepository.findOne({
      where: {
        id,
        is_deleted: false,
      },
      select: ['id', 'name', 'email'],
    });
  }

  async update(
    id: number,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<void> {
    const existingCustomer = await this.customerRepository.findOne({
      where: {
        id,
        is_deleted: false,
      },
      select: ['id', 'name', 'email'],
    });

    if (!existingCustomer) {
      throw new BadRequestException('Customer not found');
    }

    existingCustomer.name = updateCustomerDto.name || existingCustomer.name;

    // If password is provided, update it securely
    if (updateCustomerDto.password) {
      existingCustomer.password = await bcrypt.hash(
        updateCustomerDto.password,
        10,
      );
    }

    await this.customerRepository.save(existingCustomer);
    return;
  }

  async remove(id: number): Promise<void> {
    const customerToDelete = await this.customerRepository.findOne({
      where: {
        id,
        is_deleted: false,
      },
      select: ['id', 'name', 'email'],
    });
    if (customerToDelete) {
      // Consider soft deletion (set is_deleted to true) instead of permanent removal
      // await this.customerRepository.remove(customerToDelete); // For permanent deletion
      customerToDelete.is_deleted = true;
      await this.customerRepository.save(customerToDelete);
    }
  }

  async login(
    loginCustomerDto: LoginCustomerDto,
  ): Promise<{ id: number; name: string; accessToken: string }> {
    const { email, password } = loginCustomerDto;

    const customer = await this.customerRepository.findOne({
      where: {
        email,
        is_deleted: false,
      },
    });

    if (!customer) {
      throw new BadRequestException('Invalid email or password');
    }

    const matched = await bcrypt.compare(password, customer.password);
    if (!matched) {
      throw new BadRequestException('Invalid email or password');
    }

    const payload: CustomerTokenPayload = {
      id: customer.id,
      email: customer.email,
      user_type: UserType.CUSTOMER,
    };
    const accessToken = this.jwtService.sign(payload);

    return { id: customer.id, name: customer.name, accessToken };
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
