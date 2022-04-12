import { StatusTransaction } from '../../../5-Shared/Enum/StatusTransaction';
import { ITransactionRepository } from '../../../5-Shared/Interfaces/Repository/ITransitionRepository';
import { TransactionOrder } from '../../../3-Domain/Entity/Transaction/TransactionOrder';

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
