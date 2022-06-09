import { IGateways } from '../../Domain/Shared/Interfaces/Gateway/IGateways';
import { IMail } from '../../Domain/Shared/Interfaces/Mail/IMail';
import { StatusTransaction } from '../../Domain/Shared/Enum/StatusTransaction';
import { ILogRepository } from '../../Domain/Shared/Interfaces/Repository/ILogRepository';
import { ITransactionRepository } from '../../Domain/Shared/Interfaces/Repository/ITransitionRepository';
import { FieldMail } from '../../Domain/Entity/Mail/FieldMail';
import { Action } from '../../Domain/Entity/Log/Action';
import { LogFactory } from '../../Domain/Entity/Log/LogFactory';
import { CancelOrder } from '../../Domain/Common/Transaction/CancelOrder';
import { CancelTransactionDTOType } from '../../Domain/Shared/DTO/CancelTransactionDTOType';
import { TransactionOrderDTOType } from '../../Domain/Shared/DTO/Order/TransactionOrderDTOType';

export class CancelTransaction {
    constructor(
        private readonly gateway: IGateways,
        private readonly repositoryTransaction: ITransactionRepository,
        private readonly repositoryLog: ILogRepository,
        private readonly mail: IMail,
    ) {}

    async execute(cancelDTO: CancelTransactionDTOType): Promise<CancelOrder> {
        try {
            const transaction = await this.repositoryTransaction.findOne(cancelDTO.tid);

            if (!transaction) throw new Error('Não foi encontrado a transaction com tid ' + cancelDTO.tid);

            if (this.isValidDate(transaction) && this.isNoFinished(transaction)) {
                let cancelOrderDTO = await this.gateway.cancelTransaction(cancelDTO);
                cancelOrderDTO.numberRequest = transaction.numberRequest;
                cancelOrderDTO.amount = transaction.amount;
                const cancelTransaction = CancelOrder.createForDTO(cancelOrderDTO);
                await this.repositoryTransaction.updateStatus(cancelDTO.tid, StatusTransaction.CANCEL);
                await this.repositoryTransaction.saveCancel(cancelTransaction);
                await this.repositoryLog.register(LogFactory.success(Action.SEND.toString()));
                return cancelTransaction;
            }

            throw new Error('Não é possivel cancelar');
        } catch (error) {
            await this.mail.send(new FieldMail(error));
            await this.repositoryLog.register(LogFactory.error(Action.CANCEL.toString()));
            throw new Error(error);
        }
    }

    private isNoFinished(transaction: TransactionOrderDTOType) {
        return transaction.status !== StatusTransaction.FINNALY;
    }

    private isValidDate(transaction: TransactionOrderDTOType) {
        return true;
    }
}
