import { IGateways } from '../../Shared/Interfaces/Gateway/IGateways';
import { IMail } from '../../Shared/Interfaces/Mail/IMail';
import { StatusTransaction } from '../../Shared/Enum/StatusTransaction';
import { ILogRepository } from '../../Shared/Interfaces/Repository/ILogRepository';
import { ITransactionRepository } from '../../Shared/Interfaces/Repository/ITransitionRepository';
import { FieldMail } from '../../Domain/Entity/Mail/FieldMail';
import { TransactionOrder } from '../../Domain/Entity/Transaction/ValueObject/TransactionOrder';
import { Action } from '../../Domain/Entity/Log/Action';
import { LogFactory } from '../../Domain/Entity/Log/LogFactory';
import { ICancelRepository } from '../../Shared/Interfaces/Repository/ICancelRepository';
import { RefundOrder } from '../../Domain/Entity/Transaction/ValueObject/RefundOrder';

export class CancelReversalTransaction {
    constructor(
        private readonly gateway: IGateways,
        private readonly repositoryTransaction: ITransactionRepository,
        private readonly repositoryCancel: ICancelRepository,
        private readonly repositoryLog: ILogRepository,
        private readonly mail: IMail,
    ) {}

    async execute(numberRequest: string): Promise<RefundOrder> {
        try {
            const transaction = await this.repositoryTransaction.findOne(numberRequest);

            if (this.isValidDate(transaction) && this.isNoFinished(transaction)) {
                const cancelTransaction = this.gateway.cancelReversalTransaction(numberRequest);
                await this.repositoryTransaction.updateStatus(numberRequest, StatusTransaction.CANCEL);
                await this.repositoryCancel.save(await cancelTransaction);
                await this.repositoryLog.save(LogFactory.success(Action.SEND.toString()));
                return cancelTransaction;
            }

            throw new Error('Não é possivel cancelar');
        } catch (error) {
            await this.mail.send(new FieldMail(error));
            await this.repositoryLog.save(LogFactory.error(Action.CANCEL.toString()));
            throw new Error(error);
        }
    }

    private isNoFinished(transaction: TransactionOrder) {
        return transaction.status !== StatusTransaction.FINNALY;
    }

    private isValidDate(transaction: TransactionOrder) {
        return true;
    }
}