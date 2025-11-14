import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AttractionsModule } from './attractions/attractions.module';
import { PlacesModule } from './places/places.module';
import { SavedAttractionsModule } from './saved-attractions/saved-attractions.module';
import { VisitedAttractionsModule } from './visited-attractions/visited-attractions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfig } from 'typeorm.config';
@Module({
  imports: [
    UsersModule, 
    AttractionsModule, 
    PlacesModule, 
    SavedAttractionsModule, 
    VisitedAttractionsModule, 
    TypeOrmModule.forRoot(
      typeOrmConfig
    ), 
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
