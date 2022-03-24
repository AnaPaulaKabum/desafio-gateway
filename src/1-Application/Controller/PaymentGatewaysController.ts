import { TransactionCreatedResponse } from "../../3-Domain/Entity/TransactionCreatedResponse.js";
import { CancelReversalTransaction } from "../../2-Usecases/Transaction/CancelReversalTransaction.js";
import { CaptureTransaction } from "../../2-Usecases/Transaction/CaptureTransaction.js";
import { SearchTransaction } from "../../2-Usecases/Transaction/SearchTransaction.js";
import { SendTransaction } from "../../2-Usecases/Transaction/SendTransaction.js";
import { ConverterRequestToTransaction } from "../Converter/ConverterRequestToTransaction.js";
import { CreateTransactionRequest } from "../Request/createTransactionRequest.js";
import { TransactionResponse } from "../../3-Domain/Entity/TransactionSearchResponse.js";

export class PaymentGatewaysController{

    constructor ( private readonly sendTransaction: SendTransaction,
                  private readonly searchTransaction: SearchTransaction,
                  private readonly captureTransaction: CaptureTransaction,
                  private readonly cancelReversalTransaction: CancelReversalTransaction) {}

    public sendTransactions (createTransicaoRequest: CreateTransactionRequest) : TransactionCreatedResponse{

       console.log('.Controller');
       const TransactionRequest = ConverterRequestToTransaction.converte(createTransicaoRequest);
       return this.sendTransaction.execute(TransactionRequest);
    }

    public searchTransactions(paramNumberRequest :string): TransactionResponse{

        console.log('.Controller');
        return this.searchTransaction.execute(paramNumberRequest);
    }

    public captureTransactions(paramNumberRequest:string,amount:number):TransactionResponse{

        console.log('.Controller');
        return this.captureTransaction.execute(paramNumberRequest,amount); 
    }

    public cancelReversalTransactions (paramNumberRequest:string){

        this.cancelReversalTransaction.execute(paramNumberRequest)   
    }
}