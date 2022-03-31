import { TransactionDTOToTrasactionRede } from './Request/Converte/TransactionDTOToTrasactionRede.js';
import { Transaction } from '../../../3-Domain/Entity/Transaction/Transaction.js';
import { IGateways } from '../../../5-Shared/Interfaces/Gateway/IGateways.js';
import { MockSendTransaction } from './Mock/SendTransaction.js';
import { MapperSend } from './Mapper/Transaction/MapperSend.js';
import { MockSearchTransaction } from './Mock/SearchTransaction.js';
import { MapperSearch } from './Mapper/Transaction/MapperSearch.js';
import { MockCaptureTransaction } from './Mock/CaptureTransaction.js';
import { MapperCapture } from './Mapper/Transaction/MapperCapture.js';
import { TransactionDTO } from '../../../5-Shared/DTO/TransactionDTO.js';
import { MockCancelTransafction } from './Mock/CancelTransaction.js';
import { CancelTransaction } from '../../../3-Domain/Entity/Transaction/CancelTransaction.js';
import { MapperCancel } from './Mapper/Transaction/MapperCancel.js';
import { TransactionComplete } from '../../../3-Domain/Entity/Transaction/TransactionComplete.js';
import { Capture } from '../../../3-Domain/Entity/Transaction/Capture.js';

export class GatewayRedeAdapter implements IGateways {
    async sendTransaction(transaction: TransactionDTO): Promise<Transaction> {
        console.log('..sendTransaction(Adapter)');
        const transactionRedeRequest = TransactionDTOToTrasactionRede.generate(transaction);
        const returnAPI = await MockSendTransaction.send(transactionRedeRequest);

        return new Promise(function (resolve) {
            resolve(MapperSend.toTransaction(returnAPI, transaction.kind));
        });
    }

    async searchTransaction(numberRequest: string): Promise<TransactionComplete> {
        console.log('..searchTransaction(Adapter)');
        const returnAPI = await MockSearchTransaction.search(numberRequest);

        return new Promise(function (resolve) {
            resolve(MapperSearch.toTransactionComplete(returnAPI));
        });
    }

    async captureTransaction(numberRequest: string, amount: number): Promise<Capture> {
        console.log('..captureTransaction(Adapter)');
        const returnAPI = await MockCaptureTransaction.capture(numberRequest, amount);

        return new Promise(function (resolve) {
            resolve(MapperCapture.toCapture(returnAPI, amount));
        });
    }

    async cancelReversalTransaction(numberRequest: string): Promise<CancelTransaction> {
        console.log('..cancelReversalTransaction(Adapter)');
        const returnAPI = await MockCancelTransafction.cancel(numberRequest);

        return new Promise(function (resolve) {
            resolve(MapperCancel.toCancelTransaction(returnAPI, numberRequest));
        });
    }
}
