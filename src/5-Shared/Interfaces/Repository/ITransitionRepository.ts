import { TransactionOrder } from '../../../3-Domain/Entity/Transaction/TransactionOrder.js';
import { StatusTransaction } from '../../Enum/StatusTransaction.js';

export interface ITransactionRepository {
    searchStatus(numberRequest: string): Promise<StatusTransaction>;
    findOne(numberRequest: string): Promise<TransactionOrder>;
    save(transaction: TransactionOrder): Promise<any>;
    updateStatus(numberRequest: string, statusTransaction: StatusTransaction): Promise<any>;
}
