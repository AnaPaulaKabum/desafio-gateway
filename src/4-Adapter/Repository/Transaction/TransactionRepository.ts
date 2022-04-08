import { StatusTransaction } from '../../../5-Shared/Enum/StatusTransaction.js';
import { ITransactionRepository } from '../../../5-Shared/Interfaces/Repository/ITransitionRepository.js';
import { TransactionOrder } from '../../../3-Domain/Entity/Transaction/TransactionOrder.js';

export class TransactionRepository implements ITransactionRepository {
    searchStatus(numberRequest: string): Promise<StatusTransaction> {
        return new Promise(function (resolve) {
            resolve(StatusTransaction.NO_CAPTURE);
        });
    }
    findOne(numberRequest: string): Promise<TransactionOrder> {
        return new Promise(function (resolve) {
            resolve(new TransactionOrder());
        });
    }

    save(transaction: TransactionOrder): Promise<any> {
        return new Promise(function (resolve) {
            resolve(console.log('...salvando transaction'));
        });
    }

    updateStatus(numberRequest: string, statusTransaction: StatusTransaction): Promise<any> {
        return new Promise(function (resolve) {
            resolve(console.log('...update no status da transaction'));
        });
    }
}
