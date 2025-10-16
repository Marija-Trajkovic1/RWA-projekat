import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from './place.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Place])],
  providers: [PlacesService],
  controllers: [PlacesController],
  exports:[PlacesService]
})
export class PlacesModule {}
