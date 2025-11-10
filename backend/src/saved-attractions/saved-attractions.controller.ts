import { Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { SavedAttractionsService } from './saved-attractions.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { SavedAttractionsByUserDto } from './dto/saved-attractions-by-user';

@Controller('saved-attractions')
export class SavedAttractionsController {
    constructor(private savedAttractionsService: SavedAttractionsService)
    {}

    @UseGuards(JwtAuthGuard)
    @Post('newSavedAttraction/:attractionId')
    async newSavedAttraction(@Param('id')attractionId: number, @Req() req){
        const userId = req.user.id;
        return this.savedAttractionsService.newSavedAttraction(userId, attractionId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('deleteSavedAttraction/:attractionId')
    async deleteSavedAttraction(@Param('attractionId') attractionId: number, @Req() req){
        const userId = req.user.id;
        return this.savedAttractionsService.deleteSavedAttraction(userId, attractionId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('getSavedAttractions')
    async getSavedAttractions(@Req() req): Promise<SavedAttractionsByUserDto[]>{
        const userId = req.user.id;
        return this.savedAttractionsService.getSavedAttractionsForUser(userId);
    }
}
