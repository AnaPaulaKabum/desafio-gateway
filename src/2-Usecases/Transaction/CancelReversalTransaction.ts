import { IGateways } from '../../5-Shared/Interfaces/Gateway/IGateways';
import { IMail } from '../../5-Shared/Interfaces/Mail/IMail';
import { StatusTransaction } from '../../5-Shared/Enum/StatusTransaction';
import { ILogRepository } from '../../5-Shared/Interfaces/Repository/ILogRepository';
import { ITransactionRepository } from '../../5-Shared/Interfaces/Repository/ITransitionRepository';
import { FieldMail } from '../../3-Domain/Entity/Mail/FieldMail';
import { TransactionOrder } from '../../3-Domain/Entity/Transaction/TransactionOrder';
import { Action } from '../../3-Domain/Entity/Log/Action';
import { LogFactory } from '../../3-Domain/Entity/Log/LogFactory';
import { ICancelRepository } from '../../5-Shared/Interfaces/Repository/ICancelRepository';
import { RefundOrder } from '../../3-Domain/Entity/Transaction/RefundOrder';

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
