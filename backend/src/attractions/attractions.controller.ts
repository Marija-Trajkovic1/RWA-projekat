import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AttractionsService } from './attractions.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('attractions')
export class AttractionsController {
    constructor(private attractionsService: AttractionsService){}

    @UseGuards(JwtAuthGuard)
    @Get('getDetailsForAttraction')
    async getDetailsForAttraction(@Query('id') id: number){
        return this.attractionsService.getDetailsForAttraction(id);
    }
}
