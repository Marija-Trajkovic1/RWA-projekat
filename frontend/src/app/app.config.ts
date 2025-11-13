import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { authReducer } from '../store/auth-store/auth.reducer';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from '../store/auth-store/auth.effects';
import { placesReducer } from '../store/places-store/places.reducer';
import { PlacesEffects } from '../store/places-store/places.effects';
import { authInterceptor } from './interceptors/auth.interceptor';
import { attractionsReducer } from '../store/attractions-store/attractions.reducer';
import { AttractionsEffects } from '../store/attractions-store/attractions.effects';
import { attractionDetailsReducer } from '../store/attraction-store/attraction.reducer';
import { AttractionDetailsEffects } from '../store/attraction-store/attraction.effects';
import { savedAttractionsReducer } from '../store/saved-attraction/saved-attraction.reducer';
import { SavedAttractionEffects } from '../store/saved-attraction/saved-attraction.effects';
import { visitedAttractionReducer } from '../store/visited-attraction/visited-attraction.reducer';
import { VisitedAttractionEffect } from '../store/visited-attraction/visited-attraction.effects';
import { clearStateMetaReduser } from '../store/meta-reducers/clear-state.metareducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore(
      {
      auth: authReducer,
      places: placesReducer,
      attractions: attractionsReducer,
      attraction: attractionDetailsReducer,
      savedattraction : savedAttractionsReducer,
      visitedattraction : visitedAttractionReducer
      },
      {
        metaReducers: [clearStateMetaReduser]
      }
    ),
    provideEffects([AuthEffects, PlacesEffects, AttractionsEffects, AttractionDetailsEffects, SavedAttractionEffects, VisitedAttractionEffect]),
    provideRouter(routes),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideStoreDevtools(),
    provideBrowserGlobalErrorListeners(),
  ]
};
