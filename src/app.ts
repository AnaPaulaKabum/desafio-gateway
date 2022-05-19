import { LogRepository } from './Infra/ConnectBD/TypeORM/Repository/Log/LogRepository';
import { Mail } from './Infra/Mail/Mail';
import { PaymentGatewaysController } from './Application/Controller/PaymentGatewaysController';
import { GatewayRedeAdapter } from './Infra/Gateway/Rede/GatewayRedeAdapter';
import { SendTransaction } from './Usecases/Transaction/SendTransaction';
import { SearchTransaction } from './Usecases/Transaction/SearchTransaction';
import { CaptureTransaction } from './Usecases/Transaction/CaptureTransaction';
import { CancelTransaction } from './Usecases/Transaction/CancelTransaction';
import { TransactionRepository } from './Infra/ConnectBD/TypeORM/Repository/Transaction/TransactionRepository';
import { GatewayCieloAdapter } from './Infra/Gateway/Cielo/GatewayCieloAdapter';
import { TypeTransaction } from './Shared/Enum/TypeTransaction.enum';
import { SearchRequest } from './Application/Request/SearchRequest';
import { CaptureRequest } from './Application/Request/CaptureRequest';
import { TransactionRequest } from './Application/Request/TransactionRequest';
import { configRede } from './Infra/Gateway/Rede/configRede';
import { ConnectCieloAPIMock } from './Infra/Gateway/Cielo/Mock/ConnectCieloAPIMock';
import { HttpAxios } from './Infra/HTTP/AXIOS/HttpAxios';
import { CancelRequest } from './Application/Request/CancelRequest';
import * as dotenv from 'dotenv';
import { ConnectDBTypeORM } from './Infra/ConnectBD/TypeORM/ConnectDBTypeORM';
import { LogEntity } from './Infra/ConnectBD/TypeORM/Entity/LogEntity';
import { Log } from './Domain/Entity/Log/Log';
import { StatusLog } from './Shared/Enum/StatusLog';

export class APP {
    private constructor() {}

    static async start(gatewayUses: number, methodUses: number, log: boolean, testAPI: boolean = false): Promise<any> {
        const createTransactionRequest = () => {
            let transactionDTO = new TransactionRequest(
                'pedido129',
                TypeTransaction.CREDIT,
                2099,
                2,
                'John Snow',
                '5448280000000007',
                1,
                2028,
                '123',
                'Compra na loja XXX',
            );

            return transactionDTO;
        };

        const searchTransactionRequestNumberRequest = () => {
            let searchTrasaction = new SearchRequest();
            searchTrasaction.numberRequest = 'pedido1234';

            return searchTrasaction;
        };

        const searchTransactionRequestTid = () => {
            let searchTrasaction = new SearchRequest();
            searchTrasaction.tid = '430075';

            return searchTrasaction;
        };

        const captureTransactionRequest = () => {
            let captureTrasactionRequest = new CaptureRequest();
            captureTrasactionRequest.tid = '430075';
            captureTrasactionRequest.amount = 100;

            return captureTrasactionRequest;
        };

        const cancelTransactionRequest = () => {
            let captureTrasactionRequest = new CancelRequest();
            captureTrasactionRequest.tid = '10012205051406212774';
            captureTrasactionRequest.amount = 100;

            return captureTrasactionRequest;
        };

        const TransactionServicesFactory = async () => {
            console.log('dir: ' + __dirname + '/Infra/ConnectBD/TypeORM/Entity/*.js');
            const connect = new ConnectDBTypeORM(__dirname + '/Infra/ConnectBD/TypeORM/Entity/*.js');
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

            let validateGateway = configRede();

            return {
                sendTransaction: new SendTransaction(
                    gateway,
                    validateGateway,
                    repositoryTransaction,
                    repositoryLog,
                    mail,
                ),
                searchTransaction: new SearchTransaction(gateway, repositoryLog),
                captureTransaction: new CaptureTransaction(gateway, repositoryTransaction, repositoryLog, mail),
                cancelTransaction: new CancelTransaction(gateway, repositoryTransaction, repositoryLog, mail),
            };
        };

        //Design Patter composite root:
        const { sendTransaction, searchTransaction, captureTransaction, cancelTransaction } =
            await TransactionServicesFactory();
        const paymentGatewaysController = new PaymentGatewaysController(
            sendTransaction,
            searchTransaction,
            captureTransaction,
            cancelTransaction,
        );

        let result;
        switch (methodUses) {
            case 1:
                result = await paymentGatewaysController.sendTransactions(createTransactionRequest());
                break;
            case 2:
                result = await paymentGatewaysController.searchTransactions(searchTransactionRequestTid());
                break;
            case 3:
                result = await paymentGatewaysController.captureTransactions(captureTransactionRequest());
                break;
            case 4:
                result = await paymentGatewaysController.cancelReversalTransactions(cancelTransactionRequest());
                break;
        }

        if (log) {
            console.log('----------');

            if (gatewayUses === 1) console.log('Resultado Rede: ');
            else console.log('Resultado Cielo: ');

            console.log(result);
        }
        return result;
    }

    static async testConnectBD() {
        const connect = new ConnectDBTypeORM(__dirname + '/Infra/ConnectBD/TypeORM/Entity/*.js');
        await connect.start();

        const log = new Log();
        log.date = new Date();
        log.message = 'Teste';
        log.statusLog = StatusLog.REGISTER;
        log.userCode = 10;

        const repository = new LogRepository(LogEntity, connect.appDataSource.manager);

        repository.register(log);
    }
}

try {
    const methodUses = 3; //1-Send 2-Search 3-Capture 4-Cancel
    let gatewayUses = 1; //1-Rede 2- Cielo
    const testAPI = true;
    APP.start(gatewayUses, methodUses, true, testAPI);
} catch (error) {
    console.error('Erro app' + error);
}

//APP.testConnectBD();

//gatewayUses = 1 + 1;
//APP.start(gatewayUses, methodUses);
