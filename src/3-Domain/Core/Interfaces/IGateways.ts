import { TransactionDTO } from "../../../5-Shared/DTO/TransactionDTO.js";
import { Transaction } from "../../Entity/Transaction.js";
import { TransactionResponse } from "../../Entity/TransactionSearchResponse.js";

export interface IGateways {

    sendTransaction(Transaction: TransactionDTO): Transaction;
    searchTransaction(numberRequest:string): TransactionResponse;
    captureTransaction(numberRequest:string,amount:number):TransactionResponse;
    cancelReversalTransaction(numberRequest:string):any;
}