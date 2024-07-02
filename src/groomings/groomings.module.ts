import { Module } from '@nestjs/common';
import { GroomingsService } from './groomings.service';
import { GroomingsController } from './groomings.controller';

@Module({
  controllers: [GroomingsController],
  providers: [GroomingsService],
})
export class GroomingsModule {}
