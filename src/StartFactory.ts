import { ConnectDBTypeORM } from './Infra/ConnectBD/TypeORM/ConnectDBTypeORM';
import { LogEntity } from './Infra/ConnectBD/TypeORM/Entity/LogEntity';
import { LogRepository } from './Infra/ConnectBD/TypeORM/Repository/Log/LogRepository';
import { TransactionRepository } from './Infra/ConnectBD/TypeORM/Repository/Transaction/TransactionRepository';
import { HttpAxios } from './Infra/HTTP/AXIOS/HttpAxios';
import { Mail } from './Infra/Mail/Mail';
import * as dotenv from 'dotenv';
import { GatewayRedeAdapter } from './Infra/Gateway/Rede/GatewayRedeAdapter';
import { ConnectCieloAPIMock } from './Infra/Gateway/Cielo/Mock/ConnectCieloAPIMock';
import { GatewayCieloAdapter } from './Infra/Gateway/Cielo/GatewayCieloAdapter';
import { SendTransaction } from './Usecases/Transaction/SendTransaction';
import { SearchTransaction } from './Usecases/Transaction/SearchTransaction';
import { CaptureTransaction } from './Usecases/Transaction/CaptureTransaction';
import { CancelTransaction } from './Usecases/Transaction/CancelTransaction';

export class StartFactory {
    static async transactionServices(gatewayUses: number, testAPI: boolean) {
        console.log('dir: ' + __dirname + '/Infra/ConnectBD/TypeORM/Entity/*.js');
        const connect = new ConnectDBTypeORM(
            __dirname + '/Infra/ConnectBD/TypeORM/Entity/*.js',
            __dirname + '/Infra/ConnectBD/TypeORM/Migrate/*.js',
        );
        await connect.start();

        const repositoryTransaction = new TransactionRepository(connect.appDataSource.manager);
        const repositoryLog = new LogRepository(LogEntity, connect.appDataSource.manager);
        const mail = new Mail();

        let gateway;
        if (gatewayUses === 1) {
            if (testAPI) {
                const http = new HttpAxios();
                dotenv.config();
                const baseUrl = process.env.API;
                if (!baseUrl) throw new Error('Favor preencher o campo API do .env');
                http.setBaseUrl(baseUrl);
                const username = process.env.USERNAME_API;
                if (!username) throw new Error('Favor username o campo API do .env');
                const password = process.env.PASSWORD_API;
                if (!password) throw new Error('Favor password o campo API do .env');
                http.setAuth(username, password);
                gateway = new GatewayRedeAdapter(http);
            } // else conectAPIRede = new ConnectRedeAPIMock();
        } else {
            const conectAPICielo = new ConnectCieloAPIMock();
            gateway = new GatewayCieloAdapter(conectAPICielo);
        }

        return {
            sendTransaction: new SendTransaction(gateway, repositoryTransaction, repositoryLog, mail),
            searchTransaction: new SearchTransaction(gateway, repositoryLog),
            captureTransaction: new CaptureTransaction(gateway, repositoryTransaction, repositoryLog, mail),
            cancelTransaction: new CancelTransaction(gateway, repositoryTransaction, repositoryLog, mail),
        };
    }
}
