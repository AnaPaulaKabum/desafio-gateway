import { IGateways } from '../../../3-Domain/Core/Interfaces/IGateways';
import { CancelTransaction } from '../../../3-Domain/Entity/CancelTransaction';
import { Transaction } from '../../../3-Domain/Entity/Transaction';
import { TransactionDTO } from '../../../5-Shared/DTO/TransactionDTO';

export class GatewaysCieloAdapter implements IGateways {
    async sendTransaction(transaction: TransactionDTO): Promise<Transaction> {
        console.log('..sendTransaction(Adapter)');
        //const transactionRedeRequest = TransactionDTOToTrasactionRede.generate(transaction);
        // const returnAPI = await MockSendTransaction.send(transactionRedeRequest);

        //return new Promise(function (resolve) {
        //    resolve(ReturnAPIToTransaction.converte(returnAPI));
        //});

        return new Promise(function (resolve) {
            resolve(new Transaction());
        });
    }

    async searchTransaction(numberRequest: string): Promise<Transaction> {
        console.log('..searchTransaction(Adapter)');
        /*const returnAPI = await MockSearchTransaction.search(numberRequest);

        return new Promise(function (resolve) {
            resolve(ReturnAPIToSearchTransaction.converte(returnAPI));
        });*/

        return new Promise(function (resolve) {
            resolve(new Transaction());
        });
    }

    async captureTransaction(numberRequest: string, amount: number): Promise<Transaction> {
        console.log('..captureTransaction(Adapter)');
        /*const returnAPI = await MockCaptureTransaction.capture(numberRequest, amount);

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
}
