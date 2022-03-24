
import { CreateTransactionRede } from "./CreateTransactionRede.js";
import { TransactionCreatedResponse } from "../../../3-Domain/Entity/TransactionCreatedResponse.js";
import { Transaction } from "../../../3-Domain/Entity/Transaction.js";
import { IGateways } from "../../../3-Domain/Core/Interfaces/IGateways.js";
import { MockSendTransaction } from "./Mock/SendTransaction.js";
import { ReturnAPIToTransactionCreatedResponse } from "./Converter/Transaction/ReturnAPIToTransactionCreatedResponse.js";
import { MockSearchTransaction } from "./Mock/SearchTransaction.js";
import { ReturnAPIToSearchTransaction } from "./Converter/Transaction/ReturnAPIToSearchTransaction.js";
import { TransactionResponse } from "../../../3-Domain/Entity/TransactionSearchResponse.js";
import { MockCaptureTransaction } from "./Mock/CaptureTransaction.js";
import { ReturnAPIToCaptureTransaction } from "./Converter/Transaction/ReturnAPIToCaptureTransaction.js";

export class GatewaysRedeAdapter implements IGateways{

    sendTransaction(Transaction: Transaction): TransactionCreatedResponse {

       console.log('..sendTransaction(Adapter)');
       const TransactionRedeRequest = CreateTransactionRede.generate(Transaction);
       const returnAPI = MockSendTransaction.send(TransactionRedeRequest);

       return ReturnAPIToTransactionCreatedResponse.converte(returnAPI);
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