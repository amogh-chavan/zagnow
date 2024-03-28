import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { VendorService } from './vendor.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import ApiResponse from 'src/shared/dto/api_response.dto';
import { LoginVendorDto } from './dto/login-vendor.dto';
import { AuthGuard } from './auth.gaurd';
import { TOKEN_NAME } from 'src/constant/variable.constant';
import { RoleGuard } from './role.gaurd';
import { Roles } from './role.decorator';
import { VendorRoles } from './enum';
import { RequestTokenPayload } from 'src/shared/types/request';
import { hasDuplicates } from 'src/shared/utils/validator';

@Controller('user/vendor')
@ApiTags('Vendor')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new vendor profile as guest user' })
  async create(@Body() createVendorDto: CreateVendorDto) {
    if (
      !createVendorDto.roles.every((role: VendorRoles) =>
        Object.values(VendorRoles).includes(role),
      )
    ) {
      throw new BadRequestException('Invalid role: Roles must be owner');
    }

    if (hasDuplicates(createVendorDto.roles)) {
      throw new BadRequestException('Duplicate roles are not allowed');
    }
    const data = await this.vendorService.create(createVendorDto);
    return new ApiResponse(true, data, 'Vendor created');
  }

  @Get()
  @ApiOperation({ summary: 'Get vendor profile as vendor' })
  @Roles(VendorRoles.OWNER)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiBearerAuth(TOKEN_NAME)
  async findOne(@Req() request: RequestTokenPayload) {
    const data = await this.vendorService.findOne(request.data.id);
    return new ApiResponse(true, data, 'Vendor Fetched');
  }

  @Patch()
  @ApiOperation({ summary: 'Update vendor profile as vendor' })
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
  @ApiOperation({ summary: 'Delete vendor profile as vendor' })
  @Roles(VendorRoles.OWNER)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiBearerAuth(TOKEN_NAME)
  async remove(@Req() request: RequestTokenPayload) {
    const data = await this.vendorService.remove(request.data.id);
    return new ApiResponse(true, data, 'Vendor Deleted');
  }

  @Post('/auth/login')
  @ApiOperation({ summary: 'Login as vendor' })
  async login(@Body() loginVendorDto: LoginVendorDto) {
    const data = await this.vendorService.login(loginVendorDto);
    return new ApiResponse(true, data, 'Vendor logged in');
  }
}
