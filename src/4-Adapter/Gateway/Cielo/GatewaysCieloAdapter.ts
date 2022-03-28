import { IGateways } from '../../../3-Domain/Core/Interfaces/IGateways';
import { ITransactionRepository } from '../../../3-Domain/Core/Interfaces/Transaction/Repository/ITransitionRepository';
import { CancelTransaction } from '../../../3-Domain/Entity/CancelTransaction';
import { Transaction } from '../../../3-Domain/Entity/Transaction';
import { TransactionDTO } from '../../../5-Shared/DTO/TransactionDTO';
import { TransactionDTOToTrasactionCielo } from './Converter/Transaction/TransactionDTOToTrasactionCielo';
import { MockCaptureCieloTransaction } from './Mock/MockCaptureCieloTransaction';
import { MockCieloSearchTransaction } from './Mock/MockCieloSearchTransaction';
import { MockCieloSendTransaction } from './Mock/MockCieloSendTransaction';
import { TransactionCieloCaptureRequest } from './Request/TransactionCieloCaptureRequest';

export class GatewaysCieloAdapter implements IGateways {
    constructor(private readonly transactionRepository: ITransactionRepository) {}

    async sendTransaction(transaction: TransactionDTO): Promise<Transaction> {
        console.log('..sendTransaction(Adapter)');

        if (transaction.kind == TypeTransaction.CREDIT) {
            const transactionRedeRequest = TransactionDTOToTrasactionCielo.generate(transaction);
            const returnAPI = await MockCieloSendTransaction.sendCredit(transactionRedeRequest);

            /*return new Promise(function (resolve) {
                resolve(ReturnAPIToTransaction.converte(returnAPI));
            });*/

            return new Promise(function (resolve) {
                resolve(new Transaction());
            });
        }

        //TYPETransaction.DEBIT
        return new Promise(function (resolve) {
            resolve(new Transaction());
        });
    }

    async searchTransaction(numberRequest: string): Promise<Transaction> {
        console.log('..searchTransaction(Adapter)');
        const returnAPI = await MockCieloSearchTransaction.search(numberRequest);

        /*
        return new Promise(function (resolve) {
            resolve(ReturnAPIToSearchTransaction.converte(returnAPI));
        });*/

        return new Promise(function (resolve) {
            resolve(new Transaction());
        });
    }

    async captureTransaction(numberRequest: string, amount: number): Promise<Transaction> {
        console.log('..captureTransaction(Adapter)');
        let transactionCaptureRequest = new TransactionCieloCaptureRequest();
        transactionCaptureRequest.amount = amount;
        transactionCaptureRequest.paymentId = numberRequest;

        let returnAPI;
        if (this.isCaptureTotal(numberRequest, amount)) {
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

    private isCaptureTotal(numberRequest: string, amount: number): boolean {
        const transaction = this.transactionRepository.findOne(numberRequest);

        if (transaction.amount === amount) return true;

        return false;
    }
}
