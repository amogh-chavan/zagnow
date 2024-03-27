import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import ApiResponse from 'src/shared/dto/api_response.dto';
import { LoginCustomerDto } from './dto/login-customer.dto';
import { AuthGuard } from './auth.gaurd';
import { TOKEN_NAME } from 'src/constant/variable.constant';

@Controller('user/customer')
@ApiTags('Customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    const data = await this.customerService.create(createCustomerDto);
    return new ApiResponse(true, data, 'Customer created');
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth(TOKEN_NAME)
  async findOne(@Param('id') id: string) {
    const data = await this.customerService.findOne(+id);
    return new ApiResponse(true, data, 'Customer Fetched');
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth(TOKEN_NAME)
  async update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    const data = await this.customerService.update(+id, updateCustomerDto);
    return new ApiResponse(true, data, 'Customer Updated');
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth(TOKEN_NAME)
  async remove(@Param('id') id: string) {
    const data = await this.customerService.remove(+id);
    return new ApiResponse(true, data, 'Customer Deleted');
  }

  @Post('/auth/login')
  async login(@Body() loginCustomerDto: LoginCustomerDto) {
    const data = await this.customerService.login(loginCustomerDto);
    return new ApiResponse(true, data, 'Customer logged in');
  }
}
