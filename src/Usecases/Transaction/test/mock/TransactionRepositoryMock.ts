import { CancelOrder } from '../../../../Domain/Entity/Transaction/CancelOrder';
import { CaptureOrder } from '../../../../Domain/Entity/Transaction/CaptureOrder';
import { TransactionOrder } from '../../../../Domain/Entity/Transaction/TransactionOrder';
import { StatusTransaction } from '../../../../Shared/Enum/StatusTransaction';
import { ITransactionRepository } from '../../../../Shared/Interfaces/Repository/ITransitionRepository';

export class TransactionRepositoryMock implements ITransactionRepository {
    searchStatus(numberRequest: string): Promise<StatusTransaction> {
        return new Promise(function (resolve) {
            resolve(StatusTransaction.NO_CAPTURE);
        });
    }
    findOne(numberRequest: string): Promise<TransactionOrder> {
        throw new Error('Method not implemented - findOne');
    }
    updateStatus(numberRequest: string, statusTransaction: StatusTransaction): Promise<any> {
        throw new Error('Method not implemented - updateStatus');
    }
    saveTransaction(transaction: TransactionOrder): Promise<any> {
        return new Promise(function (resolve) {
            resolve(null);
        });
    }
    saveCapture(capture: CaptureOrder): Promise<any> {
        throw new Error('Method not implemented - saveCapture');
    }
    saveCancel(cancel: CancelOrder): Promise<any> {
        throw new Error('Method not implemented- saveCapture');
    }
}
