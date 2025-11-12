import { Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { SavedAttractionsService } from './saved-attractions.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { SavedAttractionsByUserDto } from './dto/saved-attractions-by-user';
import { GetUser } from 'src/decorators/get-user.decorator';

@Controller('saved-attractions')
export class SavedAttractionsController {
    constructor(private savedAttractionsService: SavedAttractionsService)
    {}

    @UseGuards(JwtAuthGuard)
    @Get('getSavedAttraction/:attractionId')
    async getSavedAttraction(@Param('attractionId')attractionId: number, @GetUser('id') userId: number){
        return this.savedAttractionsService.getSavedAttraction(userId, attractionId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('updateSavedAttractionStatus/:attractionId')
    async updateSavedAttractionStatus(@Param('attractionId')attractionId: number, @GetUser('id') userId: number){
        return this.savedAttractionsService.updateSavedAttractionStatus(userId, attractionId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('deleteSavedAttraction/:attractionId')
    async deleteSavedAttraction(@Param('attractionId') attractionId: number, @GetUser('id') userId: number){
        return this.savedAttractionsService.deleteSavedAttraction(userId, attractionId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('getSavedAttractions')
    async getSavedAttractions(@GetUser('id') userId: number): Promise<SavedAttractionsByUserDto[]>{
        return this.savedAttractionsService.getSavedAttractionsForUser(userId);
    }
}
