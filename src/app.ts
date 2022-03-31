import { LogRepository } from './4-Adapter/Repository/Log/LogRepository.js';
import { Mail } from './4-Adapter/Mail/Mail.js';
import { PaymentGatewaysController } from './1-Application/Controller/PaymentGatewaysController.js';
import { GatewaysRedeAdapter } from './4-Adapter/Gateway/Rede/GatewaysRedeAdapter.js';
import { SendTransaction } from './2-Usecases/Transaction/SendTransaction.js';
import { SearchTransaction } from './2-Usecases/Transaction/SearchTransaction.js';
import { CaptureTransaction } from './2-Usecases/Transaction/CaptureTransaction.js';
import { CancelReversalTransaction } from './2-Usecases/Transaction/CancelReversalTransaction.js';
import { TransactionRepository } from './4-Adapter/Repository/Transaction/TransactionRepository.js';
import { GatewaysCieloAdapter } from './4-Adapter/Gateway/Cielo/GatewaysCieloAdapter.js';
import { TransactionDTO } from './5-Shared/DTO/TransactionDTO.js';
import { TypeTransaction } from './5-Shared/Enum/TypeTransaction.enum.js';

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
            transactionDTO.kind = TypeTransaction.DEBIT;
            transactionDTO.numberRequest = 'pedido123';
            transactionDTO.installments = 12;

            return transactionDTO;
        };

        const TransactionServicesFactory = () => {
            const repositoryTransaction = new TransactionRepository();
            const repositoryLog = new LogRepository();
            const mail = new Mail();

            let gateway;
            if (gatewayUses === 1) {
                gateway = new GatewaysRedeAdapter();
            } else {
                gateway = new GatewaysCieloAdapter(repositoryTransaction);
            }

            return {
                sendTransaction: new SendTransaction(gateway, repositoryTransaction, repositoryLog, mail),
                searchTransaction: new SearchTransaction(gateway, repositoryLog),
                captureTransaction: new CaptureTransaction(gateway, repositoryTransaction, repositoryLog, mail),
                cancelReversalTransaction: new CancelReversalTransaction(
                    gateway,
                    repositoryTransaction,
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
        console.log('Resultado: ');
        console.log(result);
    }
}

const methodUses = 3; //1-Send 2-Search 3-Capture 4-Cancel
const gatewayUses = 2; //1-Rede 2- Cielo
APP.start(gatewayUses, methodUses);
