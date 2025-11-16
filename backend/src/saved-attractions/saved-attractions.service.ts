import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SavedAttraction } from './saved-attractions.entity';
import { Repository } from 'typeorm';
import { Attraction } from 'src/attractions/attraction.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class SavedAttractionsService {
    constructor(
        @InjectRepository(SavedAttraction)
        private savedAttractionRepository : Repository<SavedAttraction>
    )
    {}

    async getIsSavedAttraction(userId: number, attractionId: number){
        const existing = await this.savedAttractionRepository.findOne({
            where: {user: {id:userId}, attraction: {id:attractionId}},
            relations:['user', 'attraction'],
        });

        if(existing){
            return {isSaved: true};
        }else{
            return {isSaved: false};
        }
    }

    async updateSavedAttractionStatus(userId: number, attractionId : number ){
        if(!userId){
            throw new BadRequestException('userId is required!');
        }
        if(!attractionId){
            throw new BadRequestException('attractionId is required');
        }
        const existing = await this.savedAttractionRepository.findOne({
            where: {user: {id: userId}, attraction: {id: attractionId}},
            relations: ['user', 'attraction'],
        });

        if(existing){
            await this.savedAttractionRepository.remove(existing);
            return {isSaved: false};
        } else {
            const newSave = this.savedAttractionRepository.create({
                user: {id:userId} as User,
                attraction: {id: attractionId} as Attraction,
            });
            await this.savedAttractionRepository.save(newSave);
            return {isSaved : true};
        }
    }

    async deleteSavedAttraction(userId: number, attractionId: number){
        const existing = await this.savedAttractionRepository.findOne({
            where: {user: {id:userId}, attraction: {id:attractionId}},
        });
        if(existing){
            await this.savedAttractionRepository.remove(existing);
            return {
                message:'Succesfuly deleted!'
            }
        }else{
            throw new InternalServerErrorException('Error while deleting saved attraction!');
        }
    }

    async getSavedAttractionsForUser(userId : number){
       const savedAttractions =await  this.savedAttractionRepository.find({
            where: {user: {id:userId}},
            relations: ['attraction', 'attraction.place'],
        })

        return  savedAttractions.map(savedAttraction =>({
            attractionId: savedAttraction.id,
            attractionName: savedAttraction.attraction.attractionName,
            placeName: savedAttraction.attraction.place.placeName
        }));
    }
}
