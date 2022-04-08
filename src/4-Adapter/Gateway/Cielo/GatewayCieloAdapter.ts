import { IGateways } from '../../../5-Shared/Interfaces/Gateway/IGateways.js';
import { TypeTransaction } from '../../../5-Shared/Enum/TypeTransaction.enum.js';
import { TransactionOrder } from '../../../3-Domain/Entity/Transaction/TransactionOrder.js';
import { TransactionDTO } from '../../../5-Shared/DTO/TransactionDTO.js';
import { MapperSend } from './Mapper/Transaction/MapperSend.js';
import { MapperTransactionCielo } from './Mapper/Transaction/MapperTransactionCielo.js';
import { MockAPICaptureCielo } from './Mock/API/MockAPICaptureCielo.js';
import { MockAPISearchCielo } from './Mock/API/MockAPISearchCielo.js';
import { MockAPISendCielo } from './Mock/API/MockAPISendCielo.js';
import { TransactionCieloCaptureRequest } from './Request/TransactionCieloCaptureRequest.js';
import { SearchTransactionOrder } from '../../../3-Domain/Entity/Transaction/SearchTransactionOrder.js';
import { MapperSearch } from './Mapper/Transaction/MapperSearch.js';
import { MapperCapture } from './Mapper/Transaction/MapperCapture.js';
import { CaptureOrder } from '../../../3-Domain/Entity/Transaction/CaptureOrder.js';
import { MockAPIReversalCielo } from './Mock/API/MockAPIReversalCielo.js';
import { MapperCancel } from './Mapper/Transaction/MapperCancel.js';
import { RefundOrder } from '../../../3-Domain/Entity/Transaction/RefundOrder.js';
import { CaptureTransactionDTO } from '../../../5-Shared/DTO/CaptureTransactionDTO.js';
import { SearchTransactionDTO } from '../../../5-Shared/DTO/SearchTransactionDTO.js';

export class GatewayCieloAdapter implements IGateways {
    async sendTransaction(transaction: TransactionDTO): Promise<TransactionOrder> {
        console.log('..sendTransaction(Adapter)');
        if (transaction.kind === TypeTransaction.CREDIT) {
            return this.sendCreditTransaction(transaction);
        }
        return this.sendDebitTransaction(transaction);
    }

    async searchTransaction(searchRequest: SearchTransactionDTO): Promise<SearchTransactionOrder> {
        console.log('..searchTransaction(Adapter)');
        const returnAPI = await MockAPISearchCielo.search(searchRequest.numberRequest);

        return new Promise(function (resolve) {
            resolve(MapperSearch.toTransactionComplete(returnAPI));
        });
    }

    async captureTransaction(captureTransactionDTO: CaptureTransactionDTO): Promise<CaptureOrder> {
        console.log('..captureTransaction(Adapter)');
        let transactionCaptureRequest = new TransactionCieloCaptureRequest();
        transactionCaptureRequest.amount = captureTransactionDTO.amount;
        transactionCaptureRequest.paymentId = captureTransactionDTO.numberRequest;

        let returnAPI = await MockAPICaptureCielo.captureTotal(transactionCaptureRequest);

        return new Promise(function (resolve) {
            resolve(MapperCapture.toCapture(returnAPI, transactionCaptureRequest));
        });
    }

    async cancelReversalTransaction(numberRequest: string): Promise<RefundOrder> {
        console.log('..cancelReversalTransaction(Adapter)');
        const returnAPI = await MockAPIReversalCielo.cancel(numberRequest);

        return new Promise(function (resolve) {
            resolve(MapperCancel.toCancelTransaction(returnAPI, numberRequest));
        });
    }

    private async sendCreditTransaction(transaction: TransactionDTO): Promise<TransactionOrder> {
        console.log('...Credito');
        const transactionRedeRequest = MapperTransactionCielo.generateCredit(transaction);
        const returnAPI = await MockAPISendCielo.sendCredit(transactionRedeRequest);

        return new Promise(function (resolve) {
            resolve(MapperSend.toTransaction(returnAPI, TypeTransaction.CREDIT));
        });
    }

    private async sendDebitTransaction(transaction: TransactionDTO): Promise<TransactionOrder> {
        console.log('...Debito');
        const transactionRedeRequest = MapperTransactionCielo.generateDebit(transaction);
        const returnAPI = await MockAPISendCielo.sendDebit(transactionRedeRequest);

        return new Promise(function (resolve) {
            resolve(MapperSend.toTransaction(returnAPI, TypeTransaction.DEBIT));
        });
    }
}
