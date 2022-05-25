import { CancelOrder } from '../../../Domain/Entity/Transaction/CancelOrder';
import { CaptureOrder } from '../../../Domain/Entity/Transaction/CaptureOrder';
import { TransactionOrder } from '../../../Domain/Entity/Transaction/TransactionOrder';
import { TransactionOrderDTO } from '../../../Shared/DTO/Order/TransactionOrderDTO';
import { StatusTransaction } from '../../../Shared/Enum/StatusTransaction';
import { TypeTransaction } from '../../../Shared/Enum/TypeTransaction.enum';
import { ITransactionRepository } from '../../../Shared/Interfaces/Repository/ITransitionRepository';

export class TransactionRepositoryMock implements ITransactionRepository {
    searchStatus(numberRequest: string): Promise<StatusTransaction> {
        return new Promise(function (resolve) {
            resolve(StatusTransaction.NO_CAPTURE);
        });
    }
    findOne(tid: string): Promise<TransactionOrderDTO | null> {
        return new Promise(function (resolve) {
            const transactionOrderDTO = new TransactionOrderDTO();
            transactionOrderDTO.numberRequest = '100';
            transactionOrderDTO.tid = '100';
            transactionOrderDTO.kind = TypeTransaction.CREDIT;
            transactionOrderDTO.status = StatusTransaction.NO_CAPTURE;
            transactionOrderDTO.amount = 100;
            transactionOrderDTO.message = 'Teste';
            transactionOrderDTO.nsu = '100';
            transactionOrderDTO.authorizationCode = '100';
            transactionOrderDTO.installments = 1;

            resolve(transactionOrderDTO);
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
