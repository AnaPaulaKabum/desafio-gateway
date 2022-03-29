import { TransactionDTO } from '../../DTO/TransactionDTO.js';
import { Transaction } from '../../../3-Domain/Entity/Transaction/Transaction.js';
import { StatusTransaction } from '../../Enum/StatusTransaction.js';

export interface ITransactionRepository {
    searchStatus(numberRequest: string): Promise<StatusTransaction>;
    findOne(numberRequest: string): Promise<Transaction>;
    save(transaction: Transaction): Promise<any>;
}
