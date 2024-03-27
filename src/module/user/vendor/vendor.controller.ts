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
import { VendorService } from './vendor.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import ApiResponse from 'src/shared/dto/api_response.dto';
import { LoginVendorDto } from './dto/login-vendor.dto';
import { AuthGuard } from './auth.gaurd';
import { TOKEN_NAME } from 'src/constant/variable.constant';
import { RoleGuard } from './role.gaurd';
import { Roles } from './role.decorator';
import { VendorRoles } from './enum';
import { RequestTokenPayload } from 'src/shared/types/request';

@Controller('user/vendor')
@ApiTags('Vendor')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Post()
  async create(@Body() createVendorDto: CreateVendorDto) {
    const data = await this.vendorService.create(createVendorDto);
    return new ApiResponse(true, data, 'Vendor created');
  }

  @Get()
  @Roles(VendorRoles.OWNER)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiBearerAuth(TOKEN_NAME)
  async findOne(@Req() request: RequestTokenPayload) {
    const data = await this.vendorService.findOne(request.data.id);
    return new ApiResponse(true, data, 'Vendor Fetched');
  }

  @Patch()
  @Roles(VendorRoles.OWNER)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiBearerAuth(TOKEN_NAME)
  async update(
    @Req() request: RequestTokenPayload,
    @Body() updateVendorDto: UpdateVendorDto,
  ) {
    const data = await this.vendorService.update(
      request.data.id,
      updateVendorDto,
    );
    return new ApiResponse(true, data, 'Vendor Updated');
  }

  @Delete()
  @Roles(VendorRoles.OWNER)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiBearerAuth(TOKEN_NAME)
  async remove(@Req() request: RequestTokenPayload) {
    const data = await this.vendorService.remove(request.data.id);
    return new ApiResponse(true, data, 'Vendor Deleted');
  }

  @Post('/auth/login')
  async login(@Body() loginVendorDto: LoginVendorDto) {
    const data = await this.vendorService.login(loginVendorDto);
    return new ApiResponse(true, data, 'Vendor logged in');
  }
}
