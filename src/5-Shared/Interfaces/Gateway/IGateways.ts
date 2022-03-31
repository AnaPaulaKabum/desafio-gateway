import { TransactionDTO } from '../../DTO/TransactionDTO.js';
import { CancelTransaction } from '../../../3-Domain/Entity/Transaction/CancelTransaction.js';
import { Transaction } from '../../../3-Domain/Entity/Transaction/Transaction.js';
import { TransactionComplete } from '../../../3-Domain/Entity/Transaction/TransactionComplete.js';
import { Capture } from '../../../3-Domain/Entity/Transaction/Capture.js';

export interface IGateways {
    sendTransaction(transaction: TransactionDTO): Promise<Transaction>;
    searchTransaction(numberRequest: string): Promise<TransactionComplete>;
    captureTransaction(numberRequest: string, amount: number): Promise<Capture>;
    cancelReversalTransaction(numberRequest: string): Promise<CancelTransaction>;
}
