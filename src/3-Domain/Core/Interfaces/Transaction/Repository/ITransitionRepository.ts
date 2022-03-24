import { StatusTransaction } from "../Enum/StatusTransaction.js";

export interface ITransactionRepository{

    searchStatus(numberRequest: string):StatusTransaction;
}