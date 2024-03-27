import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from '../admin/entities/admin.entity';
import { JwtModule } from '@nestjs/jwt';
import { AccessContorlService } from './access-control.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    JwtModule.register({
      secret: 'adminsecret',
      signOptions: { expiresIn: '2d' },
    }),
  ],
  controllers: [AdminController],
  providers: [AdminService, AccessContorlService],
  exports: [AdminService, AccessContorlService],
})
export class AdminModule {}
