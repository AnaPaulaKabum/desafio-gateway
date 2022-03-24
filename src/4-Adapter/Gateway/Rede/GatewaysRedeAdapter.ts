import { CreateTransactionRede } from "./CreateTransactionRede.js";
import { Transaction } from "../../../3-Domain/Entity/Transaction.js";
import { IGateways } from "../../../3-Domain/Core/Interfaces/IGateways.js";
import { MockSendTransaction } from "./Mock/SendTransaction.js";
import { ReturnAPIToTransaction } from "./Converter/Transaction/ReturnAPIToTransaction.js";
import { MockSearchTransaction } from "./Mock/SearchTransaction.js";
import { ReturnAPIToSearchTransaction } from "./Converter/Transaction/ReturnAPIToSearchTransaction.js";
import { TransactionResponse } from "../../../3-Domain/Entity/TransactionSearchResponse.js";
import { MockCaptureTransaction } from "./Mock/CaptureTransaction.js";
import { ReturnAPIToCaptureTransaction } from "./Converter/Transaction/ReturnAPIToCaptureTransaction.js";
import { TransactionDTO } from "../../../5-Shared/DTO/TransactionDTO.js";

export class GatewaysRedeAdapter implements IGateways{

    sendTransaction(transaction: TransactionDTO): Transaction {

       console.log('..sendTransaction(Adapter)');
       const transactionRedeRequest = CreateTransactionRede.generate(transaction);
       const returnAPI = MockSendTransaction.send(transactionRedeRequest);

       return ReturnAPIToTransaction.converte(returnAPI);
    }

    searchTransaction(numberRequest: string):TransactionResponse {

        console.log('..searchTransaction(Adapter)')
        const returnAPI = MockSearchTransaction.search(numberRequest);
        
        return ReturnAPIToSearchTransaction.converte(returnAPI);
    }
    
    captureTransaction(numberRequest: string,amount:number): TransactionResponse {

        console.log('..searchTransaction(Adapter)')
        const returnAPI = MockCaptureTransaction.capture(numberRequest,amount);

        return ReturnAPIToCaptureTransaction.converte(returnAPI);
    }
    cancelReversalTransaction(numberRequest: string) {
        throw new Error("Method not implemented.");
    }
}