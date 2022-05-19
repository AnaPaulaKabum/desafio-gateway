import { StatusTransaction } from '../../../../../Shared/Enum/StatusTransaction';
import { ITransactionRepository } from '../../../../../Shared/Interfaces/Repository/ITransitionRepository';
import { TransactionOrder } from '../../../../../Domain/Entity/Transaction/TransactionOrder';
import { TypeTransaction } from '../../../../../Shared/Enum/TypeTransaction.enum';
import { CancelOrder } from '../../../../../Domain/Entity/Transaction/CancelOrder';
import { CaptureOrder } from '../../../../../Domain/Entity/Transaction/CaptureOrder';
import { TransactionOrderRepository } from './TransactionOrderRepository';
import { TransactionOrderEntity } from '../../Entity/TransactionOrderEntity';
import { EntityManager } from 'typeorm';
import { CaptureOrderRepository } from './CaptureOrderRepository';
import { CaptureOrderEntity } from '../../Entity/CaptureOrderEntity';

export class TransactionRepository implements ITransactionRepository {
    private transactionOrder: TransactionOrderRepository;
    private captureOrder: CaptureOrderRepository;

    constructor(manager: EntityManager) {
        this.transactionOrder = new TransactionOrderRepository(TransactionOrderEntity, manager);
        this.captureOrder = new CaptureOrderRepository(CaptureOrderEntity, manager);
    }

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
        const transactionEntity = new TransactionOrderEntity();
        transactionEntity.numberRequest = transaction.numberRequest;
        transactionEntity.tid = transaction.tid;

        if (transaction.kind === TypeTransaction.CREDIT) transactionEntity.kind = 1;
        else transactionEntity.kind = 2;

        switch (transaction.status) {
            case 'no_register':
                transactionEntity.status = 1;
                break;
            case 'no_capture':
                transactionEntity.status = 2;
                break;
            case 'capture':
                transactionEntity.status = 3;
                break;
            case 'finnaly':
                transactionEntity.status = 4;
                break;
            case 'cancel':
                transactionEntity.status = 5;
                break;
        }

        transactionEntity.amount = transaction.amount;
        transactionEntity.message = transaction.message;
        transactionEntity.nsu = transaction.nsu;
        transactionEntity.authorizationCode = transaction.authorizationCode;
        transactionEntity.installments = transaction.installments;

        return this.transactionOrder.save(transactionEntity);
    }
    saveCapture(capture: CaptureOrder): Promise<any> {
        const captureEntity = new CaptureOrderEntity();
        captureEntity.numberRequest = capture.numberRequest;
        captureEntity.amount = capture.amount;
        captureEntity.date = capture.date;
        captureEntity.nsu = capture.nsu;
        captureEntity.authorizationCode = capture.authorizationCode;

        return this.captureOrder.save(captureEntity);
    }
    saveCancel(cancel: CancelOrder): Promise<any> {
        return new Promise(function (resolve) {
            resolve(null);
        });
    }
}
