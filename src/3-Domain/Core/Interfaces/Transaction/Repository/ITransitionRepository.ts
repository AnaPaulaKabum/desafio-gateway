import { Transaction } from '../../../../Entity/Transaction.js';
import { StatusTransaction } from '../Enum/StatusTransaction.js';

export interface ITransactionRepository {
    searchStatus(numberRequest: string): StatusTransaction;
    findOne(numberRequest: string): Transaction;
}
