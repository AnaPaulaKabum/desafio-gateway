import { IGateways } from '../../../5-Shared/Interfaces/Gateway/IGateways.js';
import { TypeTransaction } from '../../../5-Shared/Enum/TypeTransaction.enum.js';
import { CancelTransaction } from '../../../3-Domain/Entity/Transaction/CancelTransaction.js';
import { Transaction } from '../../../3-Domain/Entity/Transaction/Transaction.js';
import { TransactionDTO } from '../../../5-Shared/DTO/TransactionDTO.js';
import { MapperSend } from './Mapper/Transaction/MapperSend.js';
import { MapperTransactionCielo } from './Mapper/Transaction/MapperTransactionCielo.js';
import { MockCaptureCieloTransaction } from './Mock/MockCaptureCieloTransaction.js';
import { MockCieloSearchTransaction } from './Mock/MockCieloSearchTransaction.js';
import { MockCieloSendTransaction } from './Mock/MockCieloSendTransaction.js';
import { TransactionCieloCaptureRequest } from './Request/TransactionCieloCaptureRequest.js';
import { TransactionComplete } from '../../../3-Domain/Entity/Transaction/TransactionComplete.js';
import { MapperSearch } from './Mapper/Transaction/MapperSearch.js';
import { MapperCapture } from './Mapper/Transaction/MapperCapture.js';
import { Capture } from '../../../3-Domain/Entity/Transaction/Capture.js';
import { MockReversalCieloTransaction } from './Mock/MockReversalCieloTransaction.js';
import { MapperCancel } from './Mapper/Transaction/MapperCancel.js';

export class GatewaysCieloAdapter implements IGateways {
    async sendTransaction(transaction: TransactionDTO): Promise<Transaction> {
        console.log('..sendTransaction(Adapter)');
        if (transaction.kind === TypeTransaction.CREDIT) {
            return this.sendCreditTransaction(transaction);
        }
        return this.sendDebitTransaction(transaction);
    }

    async searchTransaction(numberRequest: string): Promise<TransactionComplete> {
        console.log('..searchTransaction(Adapter)');
        const returnAPI = await MockCieloSearchTransaction.search(numberRequest);

        return new Promise(function (resolve) {
            resolve(MapperSearch.toTransactionComplete(returnAPI));
        });
    }

    async captureTransaction(numberRequest: string, amount: number): Promise<Capture> {
        console.log('..captureTransaction(Adapter)');
        let transactionCaptureRequest = new TransactionCieloCaptureRequest();
        transactionCaptureRequest.amount = amount;
        transactionCaptureRequest.paymentId = numberRequest;

        let returnAPI = await MockCaptureCieloTransaction.captureTotal(transactionCaptureRequest);

        return new Promise(function (resolve) {
            resolve(MapperCapture.toCapture(returnAPI, transactionCaptureRequest));
        });
    }

    async cancelReversalTransaction(numberRequest: string): Promise<CancelTransaction> {
        console.log('..cancelReversalTransaction(Adapter)');
        const returnAPI = await MockReversalCieloTransaction.cancel(numberRequest);

        return new Promise(function (resolve) {
            resolve(MapperCancel.toCancelTransaction(returnAPI, numberRequest));
        });
    }

    private async sendCreditTransaction(transaction: TransactionDTO): Promise<Transaction> {
        console.log('...Credito');
        const transactionRedeRequest = MapperTransactionCielo.generateCredit(transaction);
        const returnAPI = await MockCieloSendTransaction.sendCredit(transactionRedeRequest);

        return new Promise(function (resolve) {
            resolve(MapperSend.toTransaction(returnAPI, TypeTransaction.CREDIT));
        });
    }

    private async sendDebitTransaction(transaction: TransactionDTO): Promise<Transaction> {
        console.log('...Debito');
        const transactionRedeRequest = MapperTransactionCielo.generateDebit(transaction);
        const returnAPI = await MockCieloSendTransaction.sendDebit(transactionRedeRequest);

        return new Promise(function (resolve) {
            resolve(MapperSend.toTransaction(returnAPI, TypeTransaction.DEBIT));
        });
    }
}
