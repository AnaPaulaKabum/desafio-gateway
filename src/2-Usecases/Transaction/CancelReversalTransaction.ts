import { IGateways } from '../../3-Domain/Core/Interfaces/IGateways.js';
import { IMail } from '../../3-Domain/Core/Interfaces/IMail.js';
import { StatusTransaction } from '../../3-Domain/Core/Interfaces/Transaction/Enum/StatusTransaction.js';
import { ILogRepository } from '../../3-Domain/Core/Interfaces/Transaction/Repository/ILogRepository.js';
import { ITransactionRepository } from '../../3-Domain/Core/Interfaces/Transaction/Repository/ITransitionRepository.js';
import { CancelTransaction } from '../../3-Domain/Entity/CancelTransaction.js';
import { Transaction } from '../../3-Domain/Entity/Transaction.js';
import { MessageSucess } from '../../3-Domain/Util/MessageSuccess.js';

export class CancelReversalTransaction {
    constructor(
        private readonly gateway: IGateways,
        private readonly repositoryTransaction: ITransactionRepository,
        private readonly repositoryLog: ILogRepository,
        private readonly mail: IMail,
    ) {}

    async execute(numberRequest: string): Promise<CancelTransaction> {
        try {
            const transaction = this.repositoryTransaction.findOne(numberRequest);

            if (this.isValidDate(transaction) && this.isNoFinished(transaction)) {
                return this.gateway.cancelReversalTransaction(numberRequest);
            }

            throw new Error('Não é possivel cancelar');
        } catch (error) {
            throw new Error(MessageSucess.generateMessage('Erro enviado Transição'));
        }
    }

    private isNoFinished(transaction: Transaction) {
        return transaction.status !== StatusTransaction.FINNALY;
    }

    private isValidDate(transaction: Transaction) {
        return true;
    }
}
