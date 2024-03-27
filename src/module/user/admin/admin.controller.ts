import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiTags } from '@nestjs/swagger';
import ApiResponse from 'src/shared/dto/api_response.dto';

@Controller('user/admin')
@ApiTags('Admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async create(@Body() createAdminDto: CreateAdminDto) {
    const data = await this.adminService.create(createAdminDto);
    return new ApiResponse(true, data, 'Admin created');
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.adminService.findOne(+id);
    return new ApiResponse(true, data, 'Admin Fetched');
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    const data = await this.adminService.update(+id, updateAdminDto);
    return new ApiResponse(true, data, 'Admin Updated');
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.adminService.remove(+id);
    return new ApiResponse(true, data, 'Admin Deleted');
  }
}
