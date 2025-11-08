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
import { attractionsReducer } from '../store/attraction-store/attractions.reducer';
import { AttarctionsEffects } from '../store/attraction-store/attractions.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({
      auth: authReducer,
      places: placesReducer,
      attractions: attractionsReducer
    }),
    provideEffects([AuthEffects, PlacesEffects, AttarctionsEffects]),
    provideStoreDevtools(),
    provideBrowserGlobalErrorListeners(),
  ]
};
