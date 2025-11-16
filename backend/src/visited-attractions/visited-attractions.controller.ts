import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { VisitedAttractionsService } from './visited-attractions.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { GetUser } from 'src/decorators/get-user.decorator';
import { VisitedAttractionDto } from './dto/visited-attraction.dto';

@Controller('visited-attractions')
export class VisitedAttractionsController {
    constructor(private visitedAttractionsService : VisitedAttractionsService) 
    {}

    @UseGuards(JwtAuthGuard)
    @Get('getVisitedAttraction/:attractionId')
    async getVisitedAttraction(@Param('attractionId') attractionId: number, @GetUser('id')userId: number): Promise<{isVisited: boolean}> {
        return this.visitedAttractionsService.getVisitedAttraction(userId, attractionId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('updateVisitedAttractionStatus/:attractionId')
    async updateVisitedAttractionStatus(
        @Param('attractionId')attractionId: number,
        @GetUser('id') userId: number,
        @Body('rating') rating: number
    ) :Promise<VisitedAttractionDto>{
        return this.visitedAttractionsService.updateVisitedAttractionStatus(attractionId, userId, rating);
    }


    @UseGuards(JwtAuthGuard)
    @Get('getAverageRatingForAttraction/:attractionId')
    async getAverageRatingForAttraction(@Param('attractionId')attractionId: number): Promise<{averageRating : number}>{
        return this.visitedAttractionsService.getAverageRatingForAttraction(attractionId);
    }
}
