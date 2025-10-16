import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SavedAttraction } from './saved-attractions.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SavedAttractionsService {
    constructor(
        @InjectRepository(SavedAttraction)
        private savedAttractionRepository : Repository<SavedAttraction>
    )
    {}
}
