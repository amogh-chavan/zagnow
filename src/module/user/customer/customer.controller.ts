import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import ApiResponse from 'src/shared/dto/api_response.dto';
import { LoginCustomerDto } from './dto/login-customer.dto';
import { AuthGuard } from './auth.gaurd';
import { TOKEN_NAME } from 'src/constant/variable.constant';
import { RequestTokenPayload } from 'src/shared/types/request';

@Controller('user/customer')
@ApiTags('Customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @ApiOperation({ summary: 'create a new customer as guest user' })
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    const data = await this.customerService.create(createCustomerDto);
    return new ApiResponse(true, data, 'Customer created');
  }

  @Get()
  @ApiOperation({ summary: 'get customer details as customer' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth(TOKEN_NAME)
  async findOne(@Req() request: RequestTokenPayload) {
    const data = await this.customerService.findOne(request.data.id);
    return new ApiResponse(true, data, 'Customer Fetched');
  }

  @Patch()
  @ApiOperation({ summary: 'update customer details as customer' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth(TOKEN_NAME)
  async update(
    @Req() request: RequestTokenPayload,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    const data = await this.customerService.update(
      request.data.id,
      updateCustomerDto,
    );
    return new ApiResponse(true, data, 'Customer Updated');
  }

  @Delete()
  @ApiOperation({ summary: 'delete customer profile as customer' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth(TOKEN_NAME)
  async remove(@Req() request: RequestTokenPayload) {
    const data = await this.customerService.remove(request.data.id);
    return new ApiResponse(true, data, 'Customer Deleted');
  }

  @Post('/auth/login')
  @ApiOperation({ summary: 'Login as customer' })
  async login(@Body() loginCustomerDto: LoginCustomerDto) {
    const data = await this.customerService.login(loginCustomerDto);
    return new ApiResponse(true, data, 'Customer logged in');
  }
}
