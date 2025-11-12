import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { VisitedAttractionsService } from './visited-attractions.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { GetUser } from 'src/decorators/get-user.decorator';

@Controller('visited-attractions')
export class VisitedAttractionsController {
    constructor(private visitedAttractionsService : VisitedAttractionsService) 
    {}

    @UseGuards(JwtAuthGuard)
    @Get('getVisitedAAttraction/:attractionId')
    async getVisitedAttraction(@Param('attractionId') attractionId: number, @GetUser('id')userId: number){
        return this.visitedAttractionsService.getVisitedAttraction(userId, attractionId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('updateVisitedAttractionStatus/:attractionId')
    async updateVisitedAttractionStatus(
        @Param('attractionId')attractionId: number,
        @GetUser('id') userId: number,
        @Body('rating') rating: number
    ){
        return this.visitedAttractionsService.updateVisitedAttractionStatus(userId, attractionId, rating);
    }
}
