import { Module } from '@nestjs/common';
import { SavedAttractionsService } from './saved-attractions.service';
import { SavedAttractionsController } from './saved-attractions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SavedAttraction } from './saved-attractions.entity';

@Module({
  imports:[TypeOrmModule.forFeature([SavedAttraction])],
  providers: [SavedAttractionsService],
  controllers: [SavedAttractionsController],
})
export class SavedAttractionsModule {}
