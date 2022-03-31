import { TransactionDTOToTrasactionRede } from './Request/Converte/TransactionDTOToTrasactionRede.js';
import { Transaction } from '../../../3-Domain/Entity/Transaction/Transaction.js';
import { IGateways } from '../../../5-Shared/Interfaces/Gateway/IGateways.js';
import { MockSendTransaction } from './Mock/SendTransaction.js';
import { ReturnAPIToTransaction } from './Converter/Transaction/ReturnAPIToTransaction.js';
import { MockSearchTransaction } from './Mock/SearchTransaction.js';
import { ReturnAPIToSearchTransaction } from './Converter/Transaction/ReturnAPIToSearchTransaction.js';
import { MockCaptureTransaction } from './Mock/CaptureTransaction.js';
import { ReturnAPIToCaptureTransaction } from './Converter/Transaction/ReturnAPIToCaptureTransaction.js';
import { TransactionDTO } from '../../../5-Shared/DTO/TransactionDTO.js';
import { MockCancelTransafction } from './Mock/CancelTransaction.js';
import { CancelTransaction } from '../../../3-Domain/Entity/Transaction/CancelTransaction.js';
import { RetrunAPIToCancelTransaction } from './Converter/Transaction/RetrunAPIToCancelTransaction.js';
import { TransactionComplete } from '../../../3-Domain/Entity/Transaction/TransactionComplete.js';
import { Capture } from '../../../3-Domain/Entity/Transaction/Capture.js';

export class GatewaysRedeAdapter implements IGateways {
    async sendTransaction(transaction: TransactionDTO): Promise<Transaction> {
        console.log('..sendTransaction(Adapter)');
        const transactionRedeRequest = TransactionDTOToTrasactionRede.generate(transaction);
        const returnAPI = await MockSendTransaction.send(transactionRedeRequest);

        return new Promise(function (resolve) {
            resolve(ReturnAPIToTransaction.converte(returnAPI, transaction.kind));
        });
    }

    async searchTransaction(numberRequest: string): Promise<TransactionComplete> {
        console.log('..searchTransaction(Adapter)');
        const returnAPI = await MockSearchTransaction.search(numberRequest);

        return new Promise(function (resolve) {
            resolve(ReturnAPIToSearchTransaction.converte(returnAPI));
        });
    }

    //A operação de cancelamento da captura e da autorização com captura automática pode ser efetuada de
    //forma parcial ou total.
    //Cancelamento parcial disponível somente em D+1 e para transações com captura.
    async captureTransaction(numberRequest: string, amount: number): Promise<Capture> {
        console.log('..captureTransaction(Adapter)');
        const returnAPI = await MockCaptureTransaction.capture(numberRequest, amount);

        return new Promise(function (resolve) {
            resolve(ReturnAPIToCaptureTransaction.converte(returnAPI));
        });
    }

    async cancelReversalTransaction(numberRequest: string): Promise<CancelTransaction> {
        console.log('..cancelReversalTransaction(Adapter)');
        const returnAPI = await MockCancelTransafction.cancel(numberRequest);

        return new Promise(function (resolve) {
            resolve(RetrunAPIToCancelTransaction.converte(returnAPI));
        });
    }
}
