import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { NanvBarComponent } from './core/components/nanv-bar/nanv-bar.component';
import { ReproductorComponent } from './core/components/reproductor/reproductor.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient()
    ,NanvBarComponent
    ,ReproductorComponent
  ]
};
