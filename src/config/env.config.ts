import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
dotenv.config({
  path: ['.dev.env', '.prod.env'],
});

export const envConfigService = new ConfigService();
