import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VisitedAttraction } from './visited-attractions.entity';
import { Repository } from 'typeorm';
import { VisitedAttractionDto } from './dto/visited-attraction.dto';

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
            return {isVisited: true};
        }else{
            return {isVisited: false};
        }
    }

    async updateVisitedAttractionStatus(attractionId: number, userId: number, rating: number): Promise<VisitedAttractionDto>{
        const existing = await this.visitedAttractionRepository.findOne({
           where: {user: {id:userId}, attraction: {id:attractionId}},
            relations: ['user', 'attraction'],
        });

        if(existing){
            existing.rating = rating;
            const visited = await this.visitedAttractionRepository.save(existing);
            return {
                id: visited.id,
                attractionId: visited.attraction.id,
                userId: visited.user.id,
                rating: visited.rating,
            }
        } else {
            const newVisited = this.visitedAttractionRepository.create({
                user: {id: userId},
                attraction: {id: attractionId},
                rating,
            });
            const visited = await this.visitedAttractionRepository.save(newVisited); 
            return {
                id: visited.id,
                attractionId: visited.attraction.id,
                userId: visited.user.id,
                rating: visited.rating,
            }  
        }
    }

    async getAverageRatingForAttraction(attractionId: number): Promise<{ averageRating: number }>{
        const countAverageRating = await this.visitedAttractionRepository
            .createQueryBuilder('visitedAttraction')
            .select('AVG(visitedAttraction.rating)', 'avg')
            .where('visitedAttraction.attractionId = :attractionId', {attractionId})
            .getRawOne<{avg: number}>();
        const averageRating = countAverageRating?.avg ?? 0;
        return {averageRating}
    }
}
