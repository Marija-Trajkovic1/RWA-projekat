export class AttractionResponseDto{
        id: number;
        attractionName:string;
        shortDescription?:string;
        longDescription?: string;
        category:string;
        latitude: number;
        longitude: number;
        workingHours?: string;
        websiteLink?: string;
}