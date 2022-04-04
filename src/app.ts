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
import { TransactionDTO } from './5-Shared/DTO/TransactionDTO.js';
import { TypeTransaction } from './5-Shared/Enum/TypeTransaction.enum.js';
import { CaptureRepository } from './4-Adapter/Repository/Transaction/CaptureRepository.js';
import { CancelRepository } from './4-Adapter/Repository/Transaction/CancelRepository.js';

export abstract class APP {
    static async start(gatewayUses: number, methodUses: number) {
        const createTransaction = () => {
            let transactionDTO = new TransactionDTO();
            transactionDTO.amount = 2099;
            transactionDTO.cardNumber = '5448280000000007';
            transactionDTO.securityCode = '123';
            transactionDTO.expirationMonth = 12;
            transactionDTO.softDescriptor = 'string';
            transactionDTO.cardholderName = 'John Snow';
            transactionDTO.expirationYear = 2028;
            transactionDTO.kind = TypeTransaction.CREDIT;
            transactionDTO.numberRequest = 'pedido123';
            transactionDTO.installments = 12;

            return transactionDTO;
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

        //Design Patter composite root:
        const { sendTransaction, searchTransaction, captureTransaction, cancelReversalTransaction } =
            TransactionServicesFactory();
        const paymentGatewaysController = new PaymentGatewaysController(
            sendTransaction,
            searchTransaction,
            captureTransaction,
            cancelReversalTransaction,
        );

        let result;
        switch (methodUses) {
            case 1:
                result = await paymentGatewaysController.sendTransactions(createTransaction());
                break;
            case 2:
                result = await paymentGatewaysController.searchTransactions('1');
                break;
            case 3:
                result = await paymentGatewaysController.captureTransactions('1', 100);
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
let gatewayUses = 1; //1-Rede 2- Cielo
APP.start(gatewayUses, methodUses);

//gatewayUses = 1 + 1;
//APP.start(gatewayUses, methodUses);
