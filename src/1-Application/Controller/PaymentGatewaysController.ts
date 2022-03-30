import { CancelReversalTransaction } from '../../2-Usecases/Transaction/CancelReversalTransaction.js';
import { CaptureTransaction } from '../../2-Usecases/Transaction/CaptureTransaction.js';
import { SearchTransaction } from '../../2-Usecases/Transaction/SearchTransaction.js';
import { SendTransaction } from '../../2-Usecases/Transaction/SendTransaction.js';
import { Transaction } from '../../3-Domain/Entity/Transaction/Transaction.js';
import { CancelTransaction } from '../../3-Domain/Entity/Transaction/CancelTransaction.js';
import { TransactionDTO } from '../../5-Shared/DTO/TransactionDTO.js';
import { TransactionComplete } from '../../3-Domain/Entity/Transaction/TransactionComplete.js';

export class PaymentGatewaysController {
    constructor(
        private readonly sendTransaction: SendTransaction,
        private readonly searchTransaction: SearchTransaction,
        private readonly captureTransaction: CaptureTransaction,
        private readonly cancelReversalTransaction: CancelReversalTransaction,
    ) {}

    public async sendTransactions(createTransicaoRequest: TransactionDTO): Promise<Transaction> {
        console.log('.Controller');
        return await this.sendTransaction.execute(createTransicaoRequest);
    }

    public searchTransactions(paramNumberRequest: string): Promise<TransactionComplete> {
        console.log('.Controller');
        return this.searchTransaction.execute(paramNumberRequest);
    }

    public captureTransactions(paramNumberRequest: string, amount: number): Promise<Transaction> {
        console.log('.Controller');
        return this.captureTransaction.execute(paramNumberRequest, amount);
    }

    public cancelReversalTransactions(paramNumberRequest: string): Promise<CancelTransaction> {
        console.log('.Controller');
        return this.cancelReversalTransaction.execute(paramNumberRequest);
    }
}
