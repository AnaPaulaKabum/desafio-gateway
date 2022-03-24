import { CreateTransactionRede } from "./CreateTransactionRede.js";
import { Transaction } from "../../../3-Domain/Entity/Transaction.js";
import { IGateways } from "../../../3-Domain/Core/Interfaces/IGateways.js";
import { MockSendTransaction } from "./Mock/SendTransaction.js";
import { ReturnAPIToTransaction } from "./Converter/Transaction/ReturnAPIToTransaction.js";
import { MockSearchTransaction } from "./Mock/SearchTransaction.js";
import { ReturnAPIToSearchTransaction } from "./Converter/Transaction/ReturnAPIToSearchTransaction.js";
import { MockCaptureTransaction } from "./Mock/CaptureTransaction.js";
import { ReturnAPIToCaptureTransaction } from "./Converter/Transaction/ReturnAPIToCaptureTransaction.js";
import { TransactionDTO } from "../../../5-Shared/DTO/TransactionDTO.js";

export class GatewaysRedeAdapter implements IGateways{

    async sendTransaction(transaction: TransactionDTO): Promise<Transaction> {

       console.log('..sendTransaction(Adapter)');
       const transactionRedeRequest = CreateTransactionRede.generate(transaction);
       const returnAPI = await MockSendTransaction.send(transactionRedeRequest);

        return new Promise(function(resolve) {
           resolve(ReturnAPIToTransaction.converte(returnAPI));
        });
    }

    async searchTransaction(numberRequest: string): Promise<Transaction> {

        console.log('..searchTransaction(Adapter)')
        const returnAPI = await MockSearchTransaction.search(numberRequest);

        return new Promise(function(resolve) {
            resolve(ReturnAPIToSearchTransaction.converte(returnAPI));
         });
    }
    
    async captureTransaction(numberRequest: string,amount:number): Promise<Transaction>  {

        console.log('..searchTransaction(Adapter)')
        const returnAPI = await MockCaptureTransaction.capture(numberRequest,amount);

        return new Promise(function(resolve) {
            resolve(ReturnAPIToCaptureTransaction.converte(returnAPI));
         });
    }
    cancelReversalTransaction(numberRequest: string) {
        throw new Error("Method not implemented.");
    }
}