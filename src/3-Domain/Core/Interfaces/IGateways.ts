import { Transaction } from "../../Entity/Transaction.js";
import { TransactionCreatedResponse } from "../../Entity/TransactionCreatedResponse.js";
import { TransactionResponse } from "../../Entity/TransactionSearchResponse.js";

export interface IGateways {

    sendTransaction(Transaction: Transaction): TransactionCreatedResponse;
    searchTransaction(numberRequest:string): TransactionResponse;
    captureTransaction(numberRequest:string,amount:number):TransactionResponse;
    cancelReversalTransaction(numberRequest:string):any;
}