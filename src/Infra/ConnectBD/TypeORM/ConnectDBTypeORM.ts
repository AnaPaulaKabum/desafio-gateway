import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

export class ConnectDBTypeORM {
    appDataSource: DataSource;

    constructor(entites: any, migrations: any) {
        const { type, host, port, username, password, database } = this.validateParamEnv();

        if (Array.isArray(entites))
            this.appDataSource = new DataSource({
                type: type,
                host: host,
                port: port,
                username: username,
                password: password,
                database: database,
                migrationsRun: true,
                migrations: [...migrations],
                entities: [...entites],
            });
        else
            this.appDataSource = new DataSource({
                type: type,
                host: host,
                port: port,
                username: username,
                password: password,
                database: database,
                migrationsRun: true,
                migrations: [migrations],
                entities: [entites],
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
    }

    async getRepository(name: string) {
        const repository = this.appDataSource.getRepository(name);
        return repository;
    }

    async close() {
        await this.appDataSource.destroy();
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
