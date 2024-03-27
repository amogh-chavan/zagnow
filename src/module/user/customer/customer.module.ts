import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Customer } from './entities/customer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer]),
    JwtModule.register({
      secret: 'customersecret',
      signOptions: { expiresIn: '2d' },
    }),
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
