import { LogRepository } from './4-Adapter/Repository/Log/LogRepository.js';
import { Mail } from './4-Adapter/Mail/Mail.js';
import { PaymentGatewaysController } from './1-Application/Controller/PaymentGatewaysController.js';
import { GatewayRedeAdapter } from './4-Adapter/Gateway/Rede/GatewayRedeAdapter.js';
import { SendTransaction } from './2-Usecases/Transaction/SendTransaction.js';
import { SearchTransaction } from './2-Usecases/Transaction/SearchTransaction.js';
import { CaptureTransaction } from './2-Usecases/Transaction/CaptureTransaction.js';
import { CancelReversalTransaction } from './2-Usecases/Transaction/CancelReversalTransaction.js';
import { TransactionRepository } from './4-Adapter/Repository/Transaction/TransactionRepository.js';
import { GatewayCieloAdapter } from './4-Adapter/Gateway/Cielo/GatewayCieloAdapter.js';
import { TypeTransaction } from './5-Shared/Enum/TypeTransaction.enum.js';
import { CaptureRepository } from './4-Adapter/Repository/Transaction/CaptureRepository.js';
import { CancelRepository } from './4-Adapter/Repository/Transaction/CancelRepository.js';
import { ValidateParamRede } from './4-Adapter/Gateway/Rede/ValidateParamRede.js';
import { SearchRequest } from './1-Application/Request/SearchRequest.js';
import { CaptureRequest } from './1-Application/Request/CaptureRequest.js';
import { TransactionRequest } from './1-Application/Request/TransactionRequest.js';

export abstract class APP {
    static async start(gatewayUses: number, methodUses: number) {
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
                gateway = new GatewayRedeAdapter();
            } else {
                gateway = new GatewayCieloAdapter();
            }

            return {
                sendTransaction: new SendTransaction(gateway, repositoryTransaction, repositoryLog, mail),
                searchTransaction: new SearchTransaction(gateway, repositoryLog),
                captureTransaction: new CaptureTransaction(
                    gateway,
                    repositoryTransaction,
                    repositoryCapture,
                    repositoryLog,
                    mail,
                ),
                cancelReversalTransaction: new CancelReversalTransaction(
                    gateway,
                    repositoryTransaction,
                    repositoryCancel,
                    repositoryLog,
                    mail,
                ),
            };
        };

        let validateGateway = new ValidateParamRede();

        //Design Patter composite root:
        const { sendTransaction, searchTransaction, captureTransaction, cancelReversalTransaction } =
            TransactionServicesFactory();
        const paymentGatewaysController = new PaymentGatewaysController(
            sendTransaction,
            searchTransaction,
            captureTransaction,
            cancelReversalTransaction,
            validateGateway,
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

        console.log('----------');

        if (gatewayUses === 1) console.log('Resultado Rede: ');
        else console.log('Resultado Cielo: ');

        console.log(result);
    }
}

const methodUses = 1; //1-Send 2-Search 3-Capture 4-Cancel
let gatewayUses = 2; //1-Rede 2- Cielo
APP.start(gatewayUses, methodUses);

//gatewayUses = 1 + 1;
//APP.start(gatewayUses, methodUses);
