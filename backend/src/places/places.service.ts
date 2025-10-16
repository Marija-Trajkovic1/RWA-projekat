import { Injectable } from '@nestjs/common';
import { Place } from './place.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PlacesService {
    constructor(
        @InjectRepository(Place)
        private placeRepository: Repository<Place>
    ) {}
}
