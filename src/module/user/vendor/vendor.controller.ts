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

@Controller('user/vendor')
@ApiTags('Vendor')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Post()
  @Roles(VendorRoles.OWNER)
  @UseGuards(AuthGuard, RoleGuard)
  async create(@Body() createVendorDto: CreateVendorDto) {
    const data = await this.vendorService.create(createVendorDto);
    return new ApiResponse(true, data, 'Vendor created');
  }

  @Get(':id')
  @Roles(VendorRoles.OWNER)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiBearerAuth(TOKEN_NAME)
  async findOne(@Param('id') id: string) {
    const data = await this.vendorService.findOne(+id);
    return new ApiResponse(true, data, 'Vendor Fetched');
  }

  @Patch(':id')
  @Roles(VendorRoles.OWNER)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiBearerAuth(TOKEN_NAME)
  async update(
    @Param('id') id: string,
    @Body() updateVendorDto: UpdateVendorDto,
  ) {
    const data = await this.vendorService.update(+id, updateVendorDto);
    return new ApiResponse(true, data, 'Vendor Updated');
  }

  @Delete(':id')
  @Roles(VendorRoles.OWNER)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiBearerAuth(TOKEN_NAME)
  async remove(@Param('id') id: string) {
    const data = await this.vendorService.remove(+id);
    return new ApiResponse(true, data, 'Vendor Deleted');
  }

  @Post('/auth/login')
  async login(@Body() loginVendorDto: LoginVendorDto) {
    const data = await this.vendorService.login(loginVendorDto);
    return new ApiResponse(true, data, 'Vendor logged in');
  }
}
