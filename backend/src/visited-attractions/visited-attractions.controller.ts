import { Controller } from '@nestjs/common';
import { VisitedAttractionsService } from './visited-attractions.service';

@Controller('visited-attractions')
export class VisitedAttractionsController {
    constructor(private visitedAttractionsService : VisitedAttractionsService) 
    {}
}
