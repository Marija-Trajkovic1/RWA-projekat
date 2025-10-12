import { Module } from '@nestjs/common';
import { SavedAttractionsService } from './saved-attractions.service';
import { SavedAttractionsController } from './saved-attractions.controller';

@Module({
  providers: [SavedAttractionsService],
  controllers: [SavedAttractionsController]
})
export class SavedAttractionsModule {}
