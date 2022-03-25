import { IGateways } from '../../3-Domain/Core/Interfaces/IGateways.js';
import { IMail } from '../../3-Domain/Core/Interfaces/IMail.js';
import { StatusTransaction } from '../../3-Domain/Core/Interfaces/Transaction/Enum/StatusTransaction.js';
import { ILogRepository } from '../../3-Domain/Core/Interfaces/Transaction/Repository/ILogRepository.js';
import { ITransactionRepository } from '../../3-Domain/Core/Interfaces/Transaction/Repository/ITransitionRepository.js';
import { Log } from '../../3-Domain/Entity/Log.js';
import { Transaction } from '../../3-Domain/Entity/Transaction.js';
import { MessageSucess } from '../../3-Domain/Util/MessageSuccess.js';
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

            if (this.isValidToSend(transaction.numberRequest)) {
                const transactionResult = this.gateway.sendTransaction(transaction);
                this.repositoryLog.save(
                    new Log(MessageSucess.generateMessage('Enviada Transação'), 'admin', new Date()),
                );
                return transactionResult;
            }

            throw new Error('Transação já cadastrada');
        } catch (error) {
            console.log(error);
            this.mail.send();
            this.repositoryLog.save(
                new Log(MessageSucess.generateMessage('Erro enviada Transação'), 'admin', new Date()),
            );
            throw new Error(MessageSucess.generateMessage('Erro enviado Transição'));
        }
    }

    private isValidToSend(numberRequest: string) {
        const status = this.repositoryTransaction.searchStatus(numberRequest);
        return status === StatusTransaction.READY;
    }
}
