import { TransactionDTO } from "../../../5-Shared/DTO/TransactionDTO.js";
import { Transaction } from "../../Entity/Transaction.js";

export interface IGateways {

    sendTransaction(transaction: TransactionDTO): Promise<Transaction>
    searchTransaction(numberRequest:string): Promise<Transaction>;
    captureTransaction(numberRequest:string,amount:number):Promise<Transaction>;
    cancelReversalTransaction(numberRequest:string):any;
}