import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { environment } from './environments/environment';

export const loggingConfigProvider = {
    provide: LoggerModule,
    useValue: LoggerModule.forRoot({
        level: !environment.isSandbox ? NgxLoggerLevel.INFO : NgxLoggerLevel.DEBUG,
        serverLogLevel: NgxLoggerLevel.OFF,
    }),
};
