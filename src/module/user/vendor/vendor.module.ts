import { Module } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Vendor } from './entities/vendor.entity';
import { AccessContorlService } from './access-control.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vendor]),
    JwtModule.register({
      secret: 'vendorsecret',
      signOptions: { expiresIn: '2d' },
    }),
  ],
  controllers: [VendorController],
  providers: [VendorService, AccessContorlService],
})
export class VendorModule {}
