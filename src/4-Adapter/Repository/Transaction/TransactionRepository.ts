import { StatusTransaction } from '../../../5-Shared/Enum/StatusTransaction.js';
import { ITransactionRepository } from '../../../5-Shared/Interfaces/Repository/ITransitionRepository.js';
import { Transaction } from '../../../3-Domain/Entity/Transaction/Transaction.js';
import { TransactionDTO } from '../../../5-Shared/DTO/TransactionDTO.js';

export class TransactionRepository implements ITransactionRepository {
    searchStatus(numberRequest: string): Promise<StatusTransaction> {
        return new Promise(function (resolve) {
            resolve(StatusTransaction.NO_CAPTURE);
        });
    }
    findOne(numberRequest: string): Promise<Transaction> {
        return new Promise(function (resolve) {
            resolve(new Transaction());
        });
    }

    save(transaction: Transaction): Promise<any> {
        return new Promise(function (resolve) {
            resolve(new Transaction());
        });
    }
}
