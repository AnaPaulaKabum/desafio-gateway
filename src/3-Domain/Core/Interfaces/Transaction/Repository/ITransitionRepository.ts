import { Transaction } from '../../../../Entity/Transaction/Transaction.js';
import { StatusTransaction } from '../Enum/StatusTransaction.js';

export interface ITransactionRepository {
    searchStatus(numberRequest: string): Promise<StatusTransaction>;
    findOne(numberRequest: string): Promise<Transaction>;
}
