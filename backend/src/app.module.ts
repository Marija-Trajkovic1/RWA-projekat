import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AttractionsModule } from './attractions/attractions.module';
import { PlacesModule } from './places/places.module';
import { SavedAttractionsModule } from './saved-attractions/saved-attractions.module';
import { VisitedAttractionsModule } from './visited-attractions/visited-attractions.module';
import { Attraction } from './attractions/attraction.entity';
import { Place } from './places/place.entity';
import { User } from './users/user.entity';
import { SavedAttraction } from './saved-attractions/saved-attractions.entity';
import { VisitedAttraction } from './visited-attractions/visited-attractions.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    UsersModule, 
    AttractionsModule, 
    PlacesModule, 
    SavedAttractionsModule, 
    VisitedAttractionsModule, 
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'postgres',
      database: 'citycompass',
      entities: [User, Place, Attraction, SavedAttraction, VisitedAttraction],
      synchronize: true,
    }), 
    AuthModule,
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath: '.env', 
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
