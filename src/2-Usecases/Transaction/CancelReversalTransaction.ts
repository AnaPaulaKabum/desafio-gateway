import { IGateways } from '../../5-Shared/Interfaces/Gateway/IGateways.js';
import { IMail } from '../../5-Shared/Interfaces/Mail/IMail.js';
import { StatusTransaction } from '../../5-Shared/Enum/StatusTransaction.js';
import { ILogRepository } from '../../5-Shared/Interfaces/Repository/ILogRepository.js';
import { ITransactionRepository } from '../../5-Shared/Interfaces/Repository/ITransitionRepository.js';
import { FieldMail } from '../../3-Domain/Entity/Mail/FieldMail.js';
import { TransactionOrder } from '../../3-Domain/Entity/Transaction/TransactionOrder.js';
import { Action } from '../../3-Domain/Entity/Log/Action.js';
import { LogFactory } from '../../3-Domain/Entity/Log/LogFactory.js';
import { ICancelRepository } from '../../5-Shared/Interfaces/Repository/ICancelRepository.js';
import { RefundOrder } from '../../3-Domain/Entity/Transaction/RefundOrder.js';

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
