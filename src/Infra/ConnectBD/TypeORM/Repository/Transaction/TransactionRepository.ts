import { EntityManager } from 'typeorm';
import { StatusTransaction } from '../../../../../Shared/Enum/StatusTransaction';
import { ITransactionRepository } from '../../../../../Shared/Interfaces/Repository/ITransitionRepository';
import { TransactionOrder } from '../../../../../Domain/Entity/Transaction/TransactionOrder';
import { TypeTransaction } from '../../../../../Shared/Enum/TypeTransaction.enum';
import { CancelOrder } from '../../../../../Domain/Entity/Transaction/CancelOrder';
import { CaptureOrder } from '../../../../../Domain/Entity/Transaction/CaptureOrder';
import { TransactionOrderEntity } from '../../Entity/TransactionOrderEntity';
import { CaptureOrderEntity } from '../../Entity/CaptureOrderEntity';
import { CancelOrderRepository } from './Order/CancelOrderRepository';
import { CancelOrderEntity } from '../../Entity/CancelOrderEntity';
import { TransactionOrderRepository } from './Order/TransactionOrderRepository';
import { CaptureOrderRepository } from './Order/CaptureOrderRepository';
import { TransactionOrderDTO } from '../../../../../Shared/DTO/Order/TransactionOrderDTO';

export class TransactionRepository implements ITransactionRepository {
    private transactionOrderRepository: TransactionOrderRepository;
    private captureOrderRepository: CaptureOrderRepository;
    private cancelOrderRepository: CancelOrderRepository;

    constructor(manager: EntityManager) {
        this.transactionOrderRepository = new TransactionOrderRepository(TransactionOrderEntity, manager);
        this.captureOrderRepository = new CaptureOrderRepository(CaptureOrderEntity, manager);
        this.cancelOrderRepository = new CancelOrderRepository(CancelOrderEntity, manager);
    }

    async searchStatus(tid: string): Promise<StatusTransaction | null> {
        const transactionDTO = await this.findOne(tid);
        if (!transactionDTO) return null;
        return transactionDTO.status;
    }
    async findOne(tid: string): Promise<TransactionOrderDTO | null> {
        const result = await this.transactionOrderRepository.findOne({
            where: {
                tid: tid,
            },
        });

        if (!result) return null;

        const kind = result.kind === 1 ? 'credit' : 'debit';
        const transactionOrderDTO = new TransactionOrderDTO();
        transactionOrderDTO.numberRequest = result.numberRequest;
        transactionOrderDTO.tid = result.tid;
        transactionOrderDTO.kind = TypeTransaction[kind];
        transactionOrderDTO.status = result.status;
        transactionOrderDTO.amount = result.amount;
        transactionOrderDTO.message = result.message;

        if (result.nsu) transactionOrderDTO.nsu = result.nsu;
        if (result.authorizationCode) transactionOrderDTO.authorizationCode = result.authorizationCode;
        if (result.installments) transactionOrderDTO.installments = result.installments;

        return transactionOrderDTO;
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

        transactionEntity.amount = transaction.amount;
        transactionEntity.message = transaction.message;
        transactionEntity.nsu = transaction.nsu;
        transactionEntity.authorizationCode = transaction.authorizationCode;
        transactionEntity.installments = transaction.installments;
        transactionEntity.status = transaction.status;

        return this.transactionOrderRepository.save(transactionEntity);
    }
    saveCapture(capture: CaptureOrder): Promise<any> {
        const captureEntity = new CaptureOrderEntity();
        captureEntity.numberRequest = capture.numberRequest;
        captureEntity.amount = capture.amount;
        captureEntity.date = capture.date;
        captureEntity.nsu = capture.nsu;
        captureEntity.authorizationCode = capture.authorizationCode;

        return this.captureOrderRepository.save(captureEntity);
    }
    saveCancel(cancel: CancelOrder): Promise<any> {
        const cancelEntity = new CancelOrderEntity();
        cancelEntity.numberRequest = cancel.numberRequest;
        cancelEntity.amount = cancel.amount;
        cancelEntity.date = cancel.date;
        cancelEntity.nsu = cancel.nsu;
        cancelEntity.authorizationCode = cancel.authorizationCode;
        cancelEntity.tid = cancel.tid;

        return this.cancelOrderRepository.save(cancelEntity);
    }
}
