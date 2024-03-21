import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { INGXLoggerConfig, NGXLogger, NgxLoggerLevel, LoggerModule } from 'ngx-logger';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Pi } from '@pinetwork-js/sdk';
import { routes } from './app.routes';
import { environment } from '../environments/environment';

const ngxLoggerConfig: INGXLoggerConfig = {
  level: !environment.isSandbox ? NgxLoggerLevel.INFO : NgxLoggerLevel.DEBUG,
  serverLogLevel: NgxLoggerLevel.OFF,
  enableSourceMaps: environment.isSandbox
};

export function initializeLogger(logger: NGXLogger): () => void {
  return () => {
    logger.updateConfig(ngxLoggerConfig);
  };
}

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient],
        },
      }),
    ),
    provideAnimationsAsync(),
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => Pi.init({ version: '2.0', sandbox: environment.isSandbox }),
      multi: true,
    },
  ]
};

LoggerModule.forRoot(ngxLoggerConfig);
