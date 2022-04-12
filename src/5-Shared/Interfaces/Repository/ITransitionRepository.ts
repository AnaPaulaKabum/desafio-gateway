import { TransactionOrder } from '../../../3-Domain/Entity/Transaction/TransactionOrder';
import { StatusTransaction } from '../../Enum/StatusTransaction';

export interface ITransactionRepository {
    searchStatus(numberRequest: string): Promise<StatusTransaction>;
    findOne(numberRequest: string): Promise<TransactionOrder>;
    save(transaction: TransactionOrder): Promise<any>;
    updateStatus(numberRequest: string, statusTransaction: StatusTransaction): Promise<any>;
}
