import { TransactionDTO } from "../../../5-Shared/DTO/TransactionDTO.js";
import { Transaction } from "../../Entity/Transaction.js";

export interface IGateways {

    sendTransaction(Transaction: TransactionDTO): Transaction;
    searchTransaction(numberRequest:string): Transaction;
    captureTransaction(numberRequest:string,amount:number):Transaction;
    cancelReversalTransaction(numberRequest:string):any;
}