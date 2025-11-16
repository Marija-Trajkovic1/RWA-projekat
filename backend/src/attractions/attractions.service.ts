import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attraction } from './attraction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AttractionsService {
    constructor(@InjectRepository(Attraction)
        private attractionRepository: Repository<Attraction>
    ) {}

    async getDetailsForAttraction(id: number){
        const attraction = await this.attractionRepository.findOneBy({id});
        
        if(attraction){
            return {
            id: attraction.id,
            attractionName:attraction.attractionName,
            shortDescription: attraction.shortDescription,
            longDescription: attraction.longDescription,
            category:attraction.category,
            workingHours: attraction.workingHours,
            websiteLink: attraction.websiteLink,
            address: attraction.address,
            phoneNumber: attraction.phoneNumber
            }
        }
        return null;
    }
}
