import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { PlacesService } from './places.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { PlaceResponseDto } from './dto/place-response.dto';
import { Attraction } from 'src/attractions/attraction.entity';

@Controller('places')
export class PlacesController {
    constructor(private placesService:PlacesService)
    {}

    @UseGuards(JwtAuthGuard)
    @Get('getAvailablePlaces')
    async getAvailablePlaces(){
        return this.placesService.getAvailablePlaces();
    }

    @UseGuards(JwtAuthGuard)
    @Get('getPlaceByName')
    async getPlaceByName(@Query('placeName') placeName: string): Promise<PlaceResponseDto | null>{
        return this.placesService.getPlaceByName(placeName);
    }

    @UseGuards(JwtAuthGuard)
    @Get('getAtractionsForPlace')
    async getAttractionsForPlace(@Query('placeName') placeName:string):Promise<Attraction[]>{
        return this.placesService.getAttractionsForPlace(placeName);
    }
}
