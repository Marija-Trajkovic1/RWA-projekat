import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VisitedAttraction } from './visited-attractions.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VisitedAttractionsService {
    constructor(
        @InjectRepository(VisitedAttraction) 
        private visitedAttractionRepository : Repository<VisitedAttraction>
    )
    {}
}
