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
import { CaptureRepository } from './Adapter/Repository/Transaction/CaptureRepository';
import { CancelRepository } from './Adapter/Repository/Transaction/CancelRepository';
import { SearchRequest } from './Application/Request/SearchRequest';
import { CaptureRequest } from './Application/Request/CaptureRequest';
import { TransactionRequest } from './Application/Request/TransactionRequest';
import { configRede } from './Adapter/Gateway/Rede/configRede';

export class APP {
    private constructor() {}

    static async start(gatewayUses: number, methodUses: number, log: boolean): Promise<any> {
        const createTransactionRequest = () => {
            let transactionDTO = new TransactionRequest(
                'pedido123',
                TypeTransaction.CREDIT,
                2099,
                2,
                'John Snow',
                '5448280000000007',
                1,
                2021,
                '123',
                'Compra na loja XXX',
            );

            return transactionDTO;
        };

        const searchTransactionRequest = () => {
            let searchTrasaction = new SearchRequest();
            searchTrasaction.numberRequest = 'pedido123';

            return searchTrasaction;
        };

        const captureTransactionRequest = () => {
            let captureTrasactionRequest = new CaptureRequest();
            captureTrasactionRequest.numberRequest = 'pedido123';
            captureTrasactionRequest.amount = 100;

            return captureTrasactionRequest;
        };

        const TransactionServicesFactory = () => {
            const repositoryTransaction = new TransactionRepository();
            const repositoryLog = new LogRepository();
            const repositoryCapture = new CaptureRepository();
            const repositoryCancel = new CancelRepository();
            const mail = new Mail();

            let gateway;
            if (gatewayUses === 1) {
                gateway = new GatewayRedeAdapter(repositoryTransaction);
            } else {
                gateway = new GatewayCieloAdapter(repositoryTransaction);
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
                captureTransaction: new CaptureTransaction(
                    gateway,
                    repositoryTransaction,
                    repositoryCapture,
                    repositoryLog,
                    mail,
                ),
                cancelTransaction: new CancelTransaction(
                    gateway,
                    repositoryTransaction,
                    repositoryCancel,
                    repositoryLog,
                    mail,
                ),
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
                result = await paymentGatewaysController.cancelReversalTransactions('1');
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

//const methodUses = 1; //1-Send 2-Search 3-Capture 4-Cancel
//let gatewayUses = 2; //1-Rede 2- Cielo
//APP.start(gatewayUses, methodUses, true);

//gatewayUses = 1 + 1;
//APP.start(gatewayUses, methodUses);
