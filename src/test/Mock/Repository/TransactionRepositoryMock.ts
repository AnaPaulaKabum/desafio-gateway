import { CancelOrder } from '../../../Domain/Common/Transaction/CancelOrder';
import { CaptureOrder } from '../../../Domain/Common/Transaction/CaptureOrder';
import { TransactionOrder } from '../../../Domain/Common/Transaction/TransactionOrder';
import { TransactionOrderDTOType } from '../../../Domain/Shared/DTO/Order/TransactionOrderDTOType';
import { StatusTransaction } from '../../../Domain/Shared/Enum/StatusTransaction';
import { TypeTransaction } from '../../../Domain/Shared/Enum/TypeTransaction.enum';
import { ITransactionRepository } from '../../../Domain/Shared/Interfaces/Repository/ITransitionRepository';

export class TransactionRepositoryMock implements ITransactionRepository {
    searchStatus(numberRequest: string): Promise<StatusTransaction> {
        return new Promise(function (resolve) {
            resolve(StatusTransaction.NO_CAPTURE);
        });
    }
    findOne(tid: string): Promise<TransactionOrderDTOType | null> {
        return new Promise(function (resolve) {
            resolve({
                id: '0309583c-c27a-4952-bf67-5a27bf3d4f1b',
                numberRequest: '100',
                tid: '100',
                kind: TypeTransaction.CREDIT,
                status: StatusTransaction.NO_CAPTURE,
                amount: 10,
                message: 'Teste',
                nsu: '100',
                authorizationCode: '100',
                installments: 100,
            });
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
