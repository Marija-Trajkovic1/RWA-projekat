import { Injectable, NotFoundException } from '@nestjs/common';
import { Place } from './place.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PlacesService {
    constructor(
        @InjectRepository(Place)
        private placeRepository: Repository<Place>
    ) {}

    async getAvailablePlaces(){
        const availablePlaces = await this.placeRepository.find({
            order:{placeName: 'ASC'}
        });

        if(availablePlaces.length===0){
            throw new NotFoundException('There are no places around!');
        }

        return availablePlaces;
    }

    async getPlaceByName(placeName: string){
        const place = await this.placeRepository.findOneBy({placeName});
        return place;
    }

    async getAttractionsForPlace(placeName:string){
        const place = await this.placeRepository.findOne({
            where: {placeName},
            relations: ['attractions']
        });

        if(!place){
            throw new NotFoundException('Place for attractions not found!');
        }

        return place.attractions.map(attraction => ({
            id: attraction.id,
            attractionName: attraction.attractionName,
            category: attraction.category,
            latitude: attraction.latitude,
            longitude: attraction.longitude,
        }));
    }
}
