import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AttractionsService } from './attractions.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AttractionDetailsResponseDto } from './dto/attraction-details-response.dto';

@Controller('attractions')
export class AttractionsController {
    constructor(private attractionsService: AttractionsService){}

    @UseGuards(JwtAuthGuard)
    @Get('getDetailsForAttraction')
    async getDetailsForAttraction(@Query('id') id: number):Promise<AttractionDetailsResponseDto | null>{
        return this.attractionsService.getDetailsForAttraction(id);
    }
}
