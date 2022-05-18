import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { LogEntity } from '../Repository/Entity/Log.entity';

export class ConnectDBTypeORM {
    appDataSource: DataSource;

    constructor(entitesUrl: string) {
        const { type, host, port, username, password, database } = this.validateParamEnv();

        this.appDataSource = new DataSource({
            type: type,
            host: host,
            port: port,
            username: username,
            password: password,
            database: database,
            synchronize: true,
            entities: [entitesUrl],
        });
    }

    private validateParamEnv(): connectType {
        dotenv.config();

        const type = process.env.TYPE;
        const host = process.env.HOST;
        const port = parseInt(process.env.PORT || '');
        const username = process.env.USERNAME_BD;
        const password = process.env.PASSWORD_BD;
        const database = process.env.DATABASE;

        if (!type) throw new Error('Favor configurar o type no arquivo .env');
        if (!host) throw new Error('Favor configurar o host no arquivo .env');
        if (!port) throw new Error('Favor configurar o port no arquivo .env');
        if (!username) throw new Error('Favor configurar o username no arquivo .env');
        if (!password) throw new Error('Favor configurar o password no arquivo .env');
        if (!database) throw new Error('Favor configurar o database no arquivo .env');

        return { type, host, port, username, password, database };
    }

    async start() {
        await this.appDataSource.initialize();
        console.log('Data Source has been initialized!');
    }

    async getRepository(name: string) {
        const repository = this.appDataSource.getRepository(name);
        return repository;
    }

    disconnect() {
        // this.appDataSource.destroy();
    }
}

type connectType = {
    type: any;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
};
