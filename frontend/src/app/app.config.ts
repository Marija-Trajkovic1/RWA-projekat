import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { authReducer } from '../store/auth-store/auth.reducer';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from '../store/auth-store/auth.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({
      auth: authReducer,
    }),
    provideEffects([AuthEffects]),
    provideStoreDevtools(),
    provideBrowserGlobalErrorListeners(),
  ]
};
