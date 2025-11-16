import { Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { SavedAttractionsService } from './saved-attractions.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { SavedAttractionsByUserDto } from './dto/saved-attractions-by-user.dto';
import { GetUser } from 'src/decorators/get-user.decorator';

@Controller('saved-attractions')
export class SavedAttractionsController {
    constructor(private savedAttractionsService: SavedAttractionsService)
    {}

    @UseGuards(JwtAuthGuard)
    @Get('getIsSavedAttraction/:attractionId')
    async getIsSavedAttraction(@Param('attractionId')attractionId: number, @GetUser('id') userId: number): Promise<{isSaved: boolean}> {
        return this.savedAttractionsService.getIsSavedAttraction(userId, attractionId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('updateSavedAttractionStatus/:attractionId')
    async updateSavedAttractionStatus(@Param('attractionId')attractionId: number, @GetUser('id') userId: number): Promise<{isSaved: boolean}> {
        return this.savedAttractionsService.updateSavedAttractionStatus(userId, attractionId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('deleteSavedAttraction/:attractionId')
    async deleteSavedAttraction(@Param('attractionId') attractionId: number, @GetUser('id') userId: number): Promise<{message:string}>{
        return this.savedAttractionsService.deleteSavedAttraction(userId, attractionId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('getSavedAttractionsForUser')
    async getSavedAttractionsForUser(@GetUser('id') userId: number): Promise<SavedAttractionsByUserDto[]>{
        return this.savedAttractionsService.getSavedAttractionsForUser(userId);
    }
}
