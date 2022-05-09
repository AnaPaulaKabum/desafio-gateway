import { LogRepository } from './Adapter/Repository/Log/LogRepository';
import { Mail } from './Adapter/Mail/Mail';
import { PaymentGatewaysController } from './Application/Controller/PaymentGatewaysController';
import { GatewayRedeAdapter } from './Adapter/Gateway/Rede/GatewayRedeAdapter';
import { SendTransaction } from './Usecases/Transaction/SendTransaction';
import { SearchTransaction } from './Usecases/Transaction/SearchTransaction';
import { CaptureTransaction } from './Usecases/Transaction/CaptureTransaction';
import { CancelTransaction } from './Usecases/Transaction/CancelTransaction';
import { TransactionRepository } from './Adapter/Repository/Transaction/TransactionRepository';
import { GatewayCieloAdapter } from './Adapter/Gateway/Cielo/GatewayCieloAdapter';
import { TypeTransaction } from './Shared/Enum/TypeTransaction.enum';
import { SearchRequest } from './Application/Request/SearchRequest';
import { CaptureRequest } from './Application/Request/CaptureRequest';
import { TransactionRequest } from './Application/Request/TransactionRequest';
import { configRede } from './Adapter/Gateway/Rede/configRede';
import { ConnectCieloAPIMock } from './Adapter/Gateway/Cielo/Mock/ConnectCieloAPIMock';
import { ConnectRedeAPIMock } from './Adapter/Gateway/Rede/Mock/ConnectRedeAPIMock';
import { ConnectRede } from './Adapter/Gateway/Rede/ConnectRede';
import { HttpAxios } from './Adapter/HTTP/AXIOS/HttpAxios';
import { IConnectRedeAPI } from './Adapter/Gateway/Rede/Interface/IConnectRedeAPI';
import { CancelRequest } from './Application/Request/CancelRequest';

export class APP {
    private constructor() {}

    static async start(gatewayUses: number, methodUses: number, log: boolean, testAPI: boolean = false): Promise<any> {
        const createTransactionRequest = () => {
            let transactionDTO = new TransactionRequest(
                'pedido124',
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

        const searchTransactionRequest = () => {
            let searchTrasaction = new SearchRequest();
            searchTrasaction.numberRequest = 'pedido1234';

            return searchTrasaction;
        };

        const captureTransactionRequest = () => {
            let captureTrasactionRequest = new CaptureRequest();
            captureTrasactionRequest.tid = '8345000363484052380';
            captureTrasactionRequest.amount = 100;

            return captureTrasactionRequest;
        };

        const cancelTransactionRequest = () => {
            let captureTrasactionRequest = new CancelRequest();
            captureTrasactionRequest.numberRequest = 'pedido123';
            captureTrasactionRequest.amount = 100;

            return captureTrasactionRequest;
        };

        const TransactionServicesFactory = () => {
            const repositoryTransaction = new TransactionRepository();
            const repositoryLog = new LogRepository();
            const mail = new Mail();

            let gateway;
            if (gatewayUses === 1) {
                let conectAPIRede: IConnectRedeAPI;
                if (testAPI) {
                    const http = new HttpAxios();
                    conectAPIRede = new ConnectRede(http);
                } else conectAPIRede = new ConnectRedeAPIMock();

                gateway = new GatewayRedeAdapter(conectAPIRede);
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
            TransactionServicesFactory();
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
                result = await paymentGatewaysController.searchTransactions(searchTransactionRequest());
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
}

const methodUses = 2; //1-Send 2-Search 3-Capture 4-Cancel
let gatewayUses = 1; //1-Rede 2- Cielo
const testAPI = true;
APP.start(gatewayUses, methodUses, true, testAPI);

//gatewayUses = 1 + 1;
//APP.start(gatewayUses, methodUses);
