import { CancelReversalTransaction } from "../../2-Usecases/Transaction/CancelReversalTransaction.js";
import { CaptureTransaction } from "../../2-Usecases/Transaction/CaptureTransaction.js";
import { SearchTransaction } from "../../2-Usecases/Transaction/SearchTransaction.js";
import { SendTransaction } from "../../2-Usecases/Transaction/SendTransaction.js";
import { ConverterRequestToTransactionDTO } from "../Converter/ConverterRequestToTransactionDTO.js";
import { CreateTransactionRequest } from "../Request/createTransactionRequest.js";
import { Transaction } from "../../3-Domain/Entity/Transaction.js";

export class PaymentGatewaysController{

    constructor ( private readonly sendTransaction: SendTransaction,
                  private readonly searchTransaction: SearchTransaction,
                  private readonly captureTransaction: CaptureTransaction,
                  private readonly cancelReversalTransaction: CancelReversalTransaction) {}

    public sendTransactions (createTransicaoRequest: CreateTransactionRequest) : Promise<Transaction>{

       console.log('.Controller');
       const TransactionRequest = ConverterRequestToTransactionDTO.converte(createTransicaoRequest);
       return this.sendTransaction.execute(TransactionRequest);
    }

    public searchTransactions(paramNumberRequest :string): Transaction{

        console.log('.Controller');
        return this.searchTransaction.execute(paramNumberRequest);
    }

    public captureTransactions(paramNumberRequest:string,amount:number):Transaction{

        console.log('.Controller');
        return this.captureTransaction.execute(paramNumberRequest,amount); 
    }

    public cancelReversalTransactions (paramNumberRequest:string){

        this.cancelReversalTransaction.execute(paramNumberRequest)   
    }
}