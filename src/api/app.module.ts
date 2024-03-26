import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RestaurantModule } from './restaurant/restaurant.module';

@Module({
  imports: [UserModule, RestaurantModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
