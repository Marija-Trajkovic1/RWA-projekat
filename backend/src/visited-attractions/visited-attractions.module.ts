import { Module } from '@nestjs/common';
import { VisitedAttractionsService } from './visited-attractions.service';
import { VisitedAttractionsController } from './visited-attractions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitedAttraction } from './visited-attractions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VisitedAttraction])],
  providers: [VisitedAttractionsService],
  controllers: [VisitedAttractionsController]
})
export class VisitedAttractionsModule {}
