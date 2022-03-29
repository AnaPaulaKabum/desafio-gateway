import { IGateways } from '../../5-Shared/Interfaces/Gateway/IGateways.js';
import { IMail } from '../../5-Shared/Interfaces/Mail/IMail.js';
import { StatusTransaction } from '../../5-Shared/Enum/StatusTransaction.js';
import { ILogRepository } from '../../5-Shared/Interfaces/Repository/ILogRepository.js';
import { ITransactionRepository } from '../../5-Shared/Interfaces/Repository/ITransitionRepository.js';
import { FieldMail } from '../../3-Domain/Entity/Mail/FieldMail.js';
import { Transaction } from '../../3-Domain/Entity/Transaction/Transaction.js';
import { Action } from '../../3-Domain/Entity/Transaction/Action.js';
import { LogFactory } from '../../3-Domain/Entity/Log/LogFactory.js';
import { TransactionDTO } from '../../5-Shared/DTO/TransactionDTO.js';

export class SendTransaction {
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
                const transactionResult = await this.gateway.sendTransaction(transaction);
                await this.repositoryTransaction.save(transactionResult);
                await this.repositoryLog.save(LogFactory.success(Action.SEND.toString()));

                return transactionResult;
            }

            throw new Error('Transação já cadastrada');
        } catch (error) {
            await this.mail.send(new FieldMail(error));
            this.repositoryLog.save(LogFactory.error(Action.SEND.toString() + error));
            throw new Error(error);
        }
    }

    private async isValidToSend(numberRequest: string) {
        const status = await this.repositoryTransaction.searchStatus(numberRequest);
        //return status === StatusTransaction.NO_REGISTER;
        return true;
    }
}
