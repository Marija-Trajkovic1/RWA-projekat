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

    async getVisitedAttraction(userId: number, attractionId: number){
        const existing = await this.visitedAttractionRepository.findOne({
            where: {user: {id:userId}, attraction: {id:attractionId}},
            relations: ['user', 'attraction'],
        });

        if(existing){
            return {isSaved: true};
        }else{
            return {isSaved: false};
        }
    }

    async updateVisitedAttractionStatus(attractionId: number, userId: number, rating: number){
        const existing = await this.visitedAttractionRepository.findOne({
           where: {user: {id:userId}, attraction: {id:attractionId}},
            relations: ['user', 'attraction'],
        });

        if(existing){
            existing.rating = rating;
            const saveVisited = await this.visitedAttractionRepository.save(existing);
            return saveVisited;
        }else{
            const newVisited = this.visitedAttractionRepository.create({
                user: {id: userId},
                attraction: {id: attractionId},
                rating,
            });
            const saveVisited = await this.visitedAttractionRepository.save(newVisited);
            return saveVisited;
        }
    }
}
