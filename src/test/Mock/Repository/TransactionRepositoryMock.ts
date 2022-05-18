import { CancelOrder } from '../../../Domain/Entity/Transaction/CancelOrder';
import { CaptureOrder } from '../../../Domain/Entity/Transaction/CaptureOrder';
import { TransactionOrder } from '../../../Domain/Entity/Transaction/TransactionOrder';
import { StatusTransaction } from '../../../Shared/Enum/StatusTransaction';
import { TypeTransaction } from '../../../Shared/Enum/TypeTransaction.enum';
import { ITransactionRepository } from '../../../Shared/Interfaces/Repository/ITransitionRepository';

export class TransactionRepositoryMock implements ITransactionRepository {
    searchStatus(numberRequest: string): Promise<StatusTransaction> {
        return new Promise(function (resolve) {
            resolve(StatusTransaction.NO_CAPTURE);
        });
    }
    findOne(numberRequest: string): Promise<TransactionOrder> {
        return new Promise(function (resolve) {
            resolve(
                new TransactionOrder(
                    '100',
                    '100',
                    TypeTransaction.CREDIT,
                    StatusTransaction.NO_CAPTURE,
                    100,
                    'Teste',
                    '100',
                    '100',
                    1,
                ),
            );
        });
    }
    updateStatus(numberRequest: string, statusTransaction: StatusTransaction): Promise<any> {
        return new Promise(function (resolve) {
            resolve(null);
        });
    }
    saveTransaction(transaction: TransactionOrder): Promise<any> {
        return new Promise(function (resolve) {
            resolve(null);
        });
    }
    saveCapture(capture: CaptureOrder): Promise<any> {
        return new Promise(function (resolve) {
            resolve(null);
        });
    }
    saveCancel(cancel: CancelOrder): Promise<any> {
        throw new Error('Method not implemented- saveCapture');
    }
}
