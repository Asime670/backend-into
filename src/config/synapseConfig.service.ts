import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SynapseConfigService {
    constructor(
        private readonly config: ConfigService,
    ) { }

    dbConfig() {
        return {
            host: this.config.get<string>('DB_HOST'),
            port: this.config.get<number>('DB_PORT'),
            username: this.config.get<string>('DB_USERNAME'),
            password: this.config.get<string>('DB_PASSWORD'),
            database: this.config.get<string>('DB_DATABASE'),
            url: this.config.get<string>('DB_URL'),
        };
    }

    appConfig() {

        return {
            env: this.config.get<string>('NODE_ENV'),
            appPort: this.config.get<number>('APP_PORT'),
            prefix: this.config.get<string>('APP_PREFIX'),
            jwtSecret: this.config.get<string>('JWT_SECRET'),
            jwtExpiresIn: this.config.get<string>('JWT_EXPIRES_IN'),

        }

    }



}