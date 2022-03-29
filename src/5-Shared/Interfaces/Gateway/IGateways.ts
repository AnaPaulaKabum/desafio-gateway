import { TransactionDTO } from '../../DTO/TransactionDTO.js';
import { CancelTransaction } from '../../../3-Domain/Entity/Transaction/CancelTransaction.js';
import { Transaction } from '../../../3-Domain/Entity/Transaction/Transaction.js';

export interface IGateways {
    sendTransaction(transaction: TransactionDTO): Promise<Transaction>;
    searchTransaction(numberRequest: string): Promise<Transaction>;
    captureTransaction(numberRequest: string, amount: number): Promise<Transaction>;
    cancelReversalTransaction(numberRequest: string): Promise<CancelTransaction>;
}
