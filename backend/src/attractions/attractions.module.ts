import { Module } from '@nestjs/common';
import { AttractionsService } from './attractions.service';
import { AttractionsController } from './attractions.controller';
import { Attraction } from './attraction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
   imports:[TypeOrmModule.forFeature([Attraction])],
  providers: [AttractionsService],
  controllers: [AttractionsController]
})
export class AttractionsModule {}
