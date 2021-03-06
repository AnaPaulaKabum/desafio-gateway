import { EntityManager } from 'typeorm';
import { StatusTransaction } from '../../../../../Domain/Shared/Enum/StatusTransaction';
import { ITransactionRepository } from '../../../../../Domain/Shared/Interfaces/Repository/ITransitionRepository';
import { TransactionOrder } from '../../../../../Domain/Common/Transaction/TransactionOrder';
import { TypeTransaction } from '../../../../../Domain/Shared/Enum/TypeTransaction.enum';
import { CancelOrder } from '../../../../../Domain/Common/Transaction/CancelOrder';
import { CaptureOrder } from '../../../../../Domain/Common/Transaction/CaptureOrder';
import { TransactionOrderEntity } from '../../Entity/TransactionOrderEntity';
import { CaptureOrderEntity } from '../../Entity/CaptureOrderEntity';
import { CancelOrderRepository } from './Order/CancelOrderRepository';
import { CancelOrderEntity } from '../../Entity/CancelOrderEntity';
import { TransactionOrderRepository } from './Order/TransactionOrderRepository';
import { CaptureOrderRepository } from './Order/CaptureOrderRepository';

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

    async findOne(tid: string): Promise<TransactionOrder | null> {
        const result = await this.transactionOrderRepository.findOne({
            where: {
                tid: tid,
            },
        });

        if (!result) return null;
        const kind = result.kind === 1 ? TypeTransaction.CREDIT : TypeTransaction.DEBIT;

        const transactionOrder = new TransactionOrder(
            result.numberRequest,
            result.tid,
            kind,
            result.status,
            result.amount,
            result.message,
            result.nsu,
            result.authorizationCode,
            result.installments,
        );
        transactionOrder.id = result.id;

        return transactionOrder;
    }

    async updateStatus(tid: string, statusTransaction: StatusTransaction): Promise<any> {
        const transaction = await this.findOne(tid);

        if (!transaction) return null;

        await this.transactionOrderRepository.update({ tid: tid }, { status: statusTransaction });
    }

    async saveTransaction(transaction: TransactionOrder): Promise<TransactionOrder> {
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

        const saveTransaction = await this.transactionOrderRepository.save(transactionEntity);
        transaction.id = saveTransaction.id;

        return transaction;
    }
    async saveCapture(capture: CaptureOrder): Promise<CaptureOrder> {
        const captureEntity = new CaptureOrderEntity();
        captureEntity.numberRequest = capture.numberRequest;
        captureEntity.amount = capture.amount;
        captureEntity.date = capture.date;
        captureEntity.nsu = capture.nsu;
        captureEntity.authorizationCode = capture.authorizationCode;

        const saveCapture = await this.captureOrderRepository.save(captureEntity);
        capture.id = saveCapture.id;

        return capture;
    }
    async saveCancel(cancel: CancelOrder): Promise<any> {
        await this.updateStatus(cancel.tid, StatusTransaction.CAPTURE);

        const cancelEntity = new CancelOrderEntity();
        cancelEntity.numberRequest = cancel.numberRequest;
        cancelEntity.amount = cancel.amount;
        cancelEntity.date = cancel.date;
        cancelEntity.nsu = cancel.nsu;
        cancelEntity.authorizationCode = cancel.authorizationCode;
        cancelEntity.tid = cancel.tid;

        const saveCancel = await this.cancelOrderRepository.save(cancelEntity);
        cancel.id = saveCancel.id;
        return cancel;
    }
}
