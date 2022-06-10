import { TransactionOrder } from '../../Domain/Common/Transaction/TransactionOrder';
import { TransactionRepository } from '../../Infra/ConnectBD/TypeORM/Repository/Transaction/TransactionRepository';

export class TransactionSeed {
    constructor(private readonly transactionRepository: TransactionRepository) {}
    async generateTransactionFix(listTransaction: Array<TransactionOrder>) {
        for (var transaction of listTransaction) {
            if (transaction) {
                await this.transactionRepository.saveTransaction(transaction);
            }
        }
    }
}
