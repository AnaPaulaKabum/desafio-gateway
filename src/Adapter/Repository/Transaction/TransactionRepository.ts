import { StatusTransaction } from '../../../Shared/Enum/StatusTransaction';
import { ITransactionRepository } from '../../../Shared/Interfaces/Repository/ITransitionRepository';
import { TransactionOrder } from '../../../Domain/Entity/Transaction/TransactionOrder';
import { TypeTransaction } from '../../../Shared/Enum/TypeTransaction.enum';
import { CancelOrder } from '../../../Domain/Entity/Transaction/CancelOrder';
import { CaptureOrder } from '../../../Domain/Entity/Transaction/CaptureOrder';

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
            resolve(console.log('...update no status da transaction'));
        });
    }

    saveTransaction(transaction: TransactionOrder): Promise<any> {
        return new Promise(function (resolve) {
            resolve(console.log('...salvando transaction'));
        });
    }
    saveCapture(capture: CaptureOrder): Promise<any> {
        return new Promise(function (resolve) {
            resolve(console.log('...salvando capture'));
        });
    }
    saveCancel(cancel: CancelOrder): Promise<any> {
        return new Promise(function (resolve) {
            resolve(console.log('...salvando cancel transaction'));
        });
    }
}
