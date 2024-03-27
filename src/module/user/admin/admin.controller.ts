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
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import ApiResponse from 'src/shared/dto/api_response.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { AuthGuard } from './auth.gaurd';
import { TOKEN_NAME } from 'src/constant/variable.constant';
import { RoleGuard } from './role.gaurd';
import { Roles } from './role.decorator';
import { AdminRoles } from './enum';

@Controller('user/admin')
@ApiTags('Admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @Roles(AdminRoles.SUPERADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  async create(@Body() createAdminDto: CreateAdminDto) {
    const data = await this.adminService.create(createAdminDto);
    return new ApiResponse(true, data, 'Admin created');
  }

  @Get(':id')
  @Roles(AdminRoles.SUPERADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiBearerAuth(TOKEN_NAME)
  async findOne(@Param('id') id: string) {
    const data = await this.adminService.findOne(+id);
    return new ApiResponse(true, data, 'Admin Fetched');
  }

  @Patch(':id')
  @Roles(AdminRoles.SUPERADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiBearerAuth(TOKEN_NAME)
  async update(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    const data = await this.adminService.update(+id, updateAdminDto);
    return new ApiResponse(true, data, 'Admin Updated');
  }

  @Delete(':id')
  @Roles(AdminRoles.SUPERADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiBearerAuth(TOKEN_NAME)
  async remove(@Param('id') id: string) {
    const data = await this.adminService.remove(+id);
    return new ApiResponse(true, data, 'Admin Deleted');
  }

  @Post('/auth/login')
  async login(@Body() loginAdminDto: LoginAdminDto) {
    const data = await this.adminService.login(loginAdminDto);
    return new ApiResponse(true, data, 'Admin logged in');
  }
}
