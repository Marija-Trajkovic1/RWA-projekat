import { Module } from '@nestjs/common';
import { VisitedAttractionsService } from './visited-attractions.service';
import { VisitedAttractionsController } from './visited-attractions.controller';

@Module({
  providers: [VisitedAttractionsService],
  controllers: [VisitedAttractionsController]
})
export class VisitedAttractionsModule {}
