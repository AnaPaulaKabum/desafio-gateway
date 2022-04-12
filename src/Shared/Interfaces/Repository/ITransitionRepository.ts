import { TransactionOrder } from '../../../Domain/Entity/Transaction/ValueObject/TransactionOrder';
import { StatusTransaction } from '../../Enum/StatusTransaction';

export interface ITransactionRepository {
    searchStatus(numberRequest: string): Promise<StatusTransaction>;
    findOne(numberRequest: string): Promise<TransactionOrder>;
    save(transaction: TransactionOrder): Promise<any>;
    updateStatus(numberRequest: string, statusTransaction: StatusTransaction): Promise<any>;
}
