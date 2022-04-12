import { StatusTransaction } from '../../../Shared/Enum/StatusTransaction';
import { ITransactionRepository } from '../../../Shared/Interfaces/Repository/ITransitionRepository';
import { TransactionOrder } from '../../../Domain/Entity/Transaction/ValueObject/TransactionOrder';
import { TypeTransaction } from '../../../Shared/Enum/TypeTransaction.enum';

export class TransactionRepository implements ITransactionRepository {
    searchStatus(numberRequest: string): Promise<StatusTransaction> {
        return new Promise(function (resolve) {
            resolve(StatusTransaction.NO_CAPTURE);
        });
    }
    findOne(numberRequest: string): Promise<TransactionOrder> {
        return new Promise(function (resolve) {
            resolve(
                TransactionOrder.create(
                    '100',
                    '100',
                    TypeTransaction.CREDIT,
                    '100',
                    '100',
                    StatusTransaction.NO_CAPTURE,
                    100,
                    1,
                    'Teste',
                ),
            );
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
