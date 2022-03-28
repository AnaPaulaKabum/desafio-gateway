import { IGateways } from '../../3-Domain/Core/Interfaces/IGateways.js';
import { IMail } from '../../3-Domain/Core/Interfaces/IMail.js';
import { StatusTransaction } from '../../3-Domain/Core/Interfaces/Transaction/Enum/StatusTransaction.js';
import { ILogRepository } from '../../3-Domain/Core/Interfaces/Transaction/Repository/ILogRepository.js';
import { ITransactionRepository } from '../../3-Domain/Core/Interfaces/Transaction/Repository/ITransitionRepository.js';
import { Transaction } from '../../3-Domain/Entity/Transaction.js';
import { Action } from '../../3-Domain/Util/Action.js';
import { LogFactory } from '../../3-Domain/Util/LogFactory.js';
import { TransactionDTO } from '../../5-Shared/DTO/TransactionDTO.js';

export class SendTransaction {
    private actionSend = Action.SEND;
    constructor(
        private readonly gateway: IGateways,
        private readonly repositoryTransaction: ITransactionRepository,
        private readonly repositoryLog: ILogRepository,
        private readonly mail: IMail,
    ) {}

    async execute(transaction: TransactionDTO): Promise<Transaction> {
        try {
            console.log('..SendTransaction(UseCases)');

            if (await this.isValidToSend(transaction.numberRequest)) {
                const transactionResult = this.gateway.sendTransaction(transaction);
                await this.repositoryLog.save(LogFactory.success(Action.SEND.toString()));

                return transactionResult;
            }

            throw new Error('Transação já cadastrada');
        } catch (error) {
            console.log(error);
            this.mail.send();
            this.repositoryLog.save(LogFactory.error(Action.SEND.toString() + error));
            throw new Error(error);
        }
    }

    private async isValidToSend(numberRequest: string) {
        const status = await this.repositoryTransaction.searchStatus(numberRequest);
        return status === StatusTransaction.READY;
    }
}
