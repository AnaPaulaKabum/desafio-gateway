import { IGateways } from '../../3-Domain/Core/Interfaces/IGateways.js';
import { IMail } from '../../3-Domain/Core/Interfaces/IMail.js';
import { StatusTransaction } from '../../3-Domain/Core/Interfaces/Transaction/Enum/StatusTransaction.js';
import { ILogRepository } from '../../3-Domain/Core/Interfaces/Transaction/Repository/ILogRepository.js';
import { ITransactionRepository } from '../../3-Domain/Core/Interfaces/Transaction/Repository/ITransitionRepository.js';
import { CancelTransaction } from '../../3-Domain/Entity/Transaction/CancelTransaction.js';
import { FieldMail } from '../../3-Domain/Entity/Mail/FieldMail.js';
import { Transaction } from '../../3-Domain/Entity/Transaction/Transaction.js';
import { Action } from '../../3-Domain/Util/Action.js';
import { LogFactory } from '../../3-Domain/Util/LogFactory.js';

export class CancelReversalTransaction {
    constructor(
        private readonly gateway: IGateways,
        private readonly repositoryTransaction: ITransactionRepository,
        private readonly repositoryLog: ILogRepository,
        private readonly mail: IMail,
    ) {}

    async execute(numberRequest: string): Promise<CancelTransaction> {
        try {
            const transaction = await this.repositoryTransaction.findOne(numberRequest);

            if (this.isValidDate(transaction) && this.isNoFinished(transaction)) {
                const cancelTransaction = this.gateway.cancelReversalTransaction(numberRequest);
                await this.repositoryLog.save(LogFactory.success(Action.SEND.toString()));
                return cancelTransaction;
            }

            throw new Error('Não é possivel cancelar');
        } catch (error) {
            console.log(error);
            await this.mail.send(new FieldMail());
            await this.repositoryLog.save(LogFactory.error(Action.CANCEL.toString()));
            throw new Error(error);
        }
    }

    private isNoFinished(transaction: Transaction) {
        return transaction.status !== StatusTransaction.FINNALY;
    }

    private isValidDate(transaction: Transaction) {
        return true;
    }
}
