export interface AttractionSummary{
    id: number;
    attractionName:string;
    category:string;
    latitude: number;
    longitude: number;
}

export interface AttractionDetails{
    id: number;
    attractionName:string;
    category:string;
    latitude: number;
    longitude: number;
    shortDescription?:string;
    longDescription?: string;
    workingHours?: string;
    websiteLink?: string;
    phoneNumber?: string;
    address?: string;
}