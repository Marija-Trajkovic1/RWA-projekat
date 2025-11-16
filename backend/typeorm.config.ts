import { Attraction } from "src/attractions/attraction.entity";
import { Place } from "src/places/place.entity";
import { SavedAttraction } from "src/saved-attractions/saved-attractions.entity";
import { User } from "src/users/user.entity";
import { VisitedAttraction } from "src/visited-attractions/visited-attractions.entity";
import { DataSourceOptions } from "typeorm";

export const typeOrmConfig : DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'citycompass',
    entities: [User, Place, Attraction, SavedAttraction, VisitedAttraction],
    synchronize: true,
}