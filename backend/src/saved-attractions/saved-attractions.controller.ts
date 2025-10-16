import { Controller } from '@nestjs/common';
import { SavedAttractionsService } from './saved-attractions.service';

@Controller('saved-attractions')
export class SavedAttractionsController {
    constructor(private savedAttractionsService: SavedAttractionsService)
    {}
}
