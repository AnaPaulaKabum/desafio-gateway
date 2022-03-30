import { IGateways } from '../../../5-Shared/Interfaces/Gateway/IGateways.js';
import { TypeTransaction } from '../../../5-Shared/Enum/TypeTransaction.enum.js';
import { ITransactionRepository } from '../../../5-Shared/Interfaces/Repository/ITransitionRepository.js';
import { CancelTransaction } from '../../../3-Domain/Entity/Transaction/CancelTransaction.js';
import { Transaction } from '../../../3-Domain/Entity/Transaction/Transaction.js';
import { TransactionDTO } from '../../../5-Shared/DTO/TransactionDTO.js';
import { ResponseAPICieloToTransaction } from './Converter/Transaction/ResponseAPICieloToTransaction.js';
import { TransactionDTOToTrasactionCielo } from './Converter/Transaction/TransactionDTOToTrasactionCielo.js';
import { MockCaptureCieloTransaction } from './Mock/MockCaptureCieloTransaction.js';
import { MockCieloSearchTransaction } from './Mock/MockCieloSearchTransaction.js';
import { MockCieloSendTransaction } from './Mock/MockCieloSendTransaction.js';
import { TransactionCieloCaptureRequest } from './Request/TransactionCieloCaptureRequest.js';
import { TransactionComplete } from '../../../3-Domain/Entity/Transaction/TransactionComplete.js';

export class GatewaysCieloAdapter implements IGateways {
    constructor(private readonly transactionRepository: ITransactionRepository) {}

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

        /*
        return new Promise(function (resolve) {
            resolve(ReturnAPIToSearchTransaction.converte(returnAPI));
        });*/

        return new Promise(function (resolve) {
            resolve(new TransactionComplete());
        });
    }

    async captureTransaction(numberRequest: string, amount: number): Promise<Transaction> {
        console.log('..captureTransaction(Adapter)');
        let transactionCaptureRequest = new TransactionCieloCaptureRequest();
        transactionCaptureRequest.amount = amount;
        transactionCaptureRequest.paymentId = numberRequest;

        let returnAPI;
        if (await this.isCaptureTotal(numberRequest, amount)) {
            returnAPI = await MockCaptureCieloTransaction.captureTotal(transactionCaptureRequest);
        } else {
            returnAPI = await MockCaptureCieloTransaction.captureTotal(transactionCaptureRequest);
        }

        /*
        return new Promise(function (resolve) {
            resolve(ReturnAPIToCaptureTransaction.converte(returnAPI));
        });*/

        return new Promise(function (resolve) {
            resolve(new Transaction());
        });
    }

    async cancelReversalTransaction(numberRequest: string): Promise<CancelTransaction> {
        console.log('..cancelReversalTransaction(Adapter)');
        /*const returnAPI = await MockCancelTransafction.cancel(numberRequest);

        return new Promise(function (resolve) {
            resolve(RetrunAPIToCancelTransaction.converte(returnAPI));
        });*/

        return new Promise(function (resolve) {
            resolve(new CancelTransaction());
        });
    }

    private async isCaptureTotal(numberRequest: string, amount: number): Promise<boolean> {
        const transaction = await this.transactionRepository.findOne(numberRequest);

        if (transaction.amount === amount) return true;

        return false;
    }

    private async sendCreditTransaction(transaction: TransactionDTO): Promise<Transaction> {
        console.log('...Credito');
        const transactionRedeRequest = TransactionDTOToTrasactionCielo.generateCredit(transaction);
        const returnAPI = await MockCieloSendTransaction.sendCredit(transactionRedeRequest);

        return new Promise(function (resolve) {
            resolve(ResponseAPICieloToTransaction.converte(returnAPI, TypeTransaction.CREDIT));
        });
    }

    private async sendDebitTransaction(transaction: TransactionDTO): Promise<Transaction> {
        console.log('...Debito');
        const transactionRedeRequest = TransactionDTOToTrasactionCielo.generateDebit(transaction);
        const returnAPI = await MockCieloSendTransaction.sendDebit(transactionRedeRequest);

        return new Promise(function (resolve) {
            resolve(ResponseAPICieloToTransaction.converte(returnAPI, TypeTransaction.DEBIT));
        });
    }
}
