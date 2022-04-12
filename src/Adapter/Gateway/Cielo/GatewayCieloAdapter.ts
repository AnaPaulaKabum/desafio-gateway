import { IGateways } from '../../../Shared/Interfaces/Gateway/IGateways';
import { TypeTransaction } from '../../../Shared/Enum/TypeTransaction.enum';
import { TransactionOrder } from '../../../Domain/Entity/Transaction/TransactionOrder';
import { TransactionDTO } from '../../../Shared/DTO/TransactionDTO';
import { MapperSend } from './Mapper/Transaction/MapperSend';
import { MapperTransactionCielo } from './Mapper/Transaction/MapperTransactionCielo';
import { MockAPICaptureCielo } from './Mock/API/MockAPICaptureCielo';
import { MockAPISearchCielo } from './Mock/API/MockAPISearchCielo';
import { MockAPISendCielo } from './Mock/API/MockAPISendCielo';
import { TransactionCieloCaptureRequest } from './Request/TransactionCieloCaptureRequest';
import { SearchTransactionOrder } from '../../../Domain/Entity/Transaction/SearchTransactionOrder';
import { MapperSearch } from './Mapper/Transaction/MapperSearch';
import { MapperCapture } from './Mapper/Transaction/MapperCapture';
import { CaptureOrder } from '../../../Domain/Entity/Transaction/CaptureOrder';
import { MockAPIReversalCielo } from './Mock/API/MockAPIReversalCielo';
import { MapperCancel } from './Mapper/Transaction/MapperCancel';
import { RefundOrder } from '../../../Domain/Entity/Transaction/RefundOrder';
import { CaptureTransactionDTO } from '../../../Shared/DTO/CaptureTransactionDTO';
import { SearchTransactionDTO } from '../../../Shared/DTO/SearchTransactionDTO';

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
