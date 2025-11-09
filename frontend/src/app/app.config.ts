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
import { AttarctionsEffects } from '../store/attractions-store/attractions.effects';
import { attractionDetailsReducer } from '../store/attraction-store/attraction.reducer';
import { AttarctionDetailsEffects } from '../store/attraction-store/attraction.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({
      auth: authReducer,
      places: placesReducer,
      attractions: attractionsReducer,
      attraction: attractionDetailsReducer
    }),
    provideEffects([AuthEffects, PlacesEffects, AttarctionsEffects, AttarctionDetailsEffects]),
    provideStoreDevtools(),
    provideBrowserGlobalErrorListeners(),
  ]
};
