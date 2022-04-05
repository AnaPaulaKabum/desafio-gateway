import { TransactionDTO } from '../../DTO/TransactionDTO.js';
import { Transaction } from '../../../3-Domain/Entity/Transaction/Transaction.js';
import { TransactionComplete } from '../../../3-Domain/Entity/Transaction/TransactionComplete.js';
import { Capture } from '../../../3-Domain/Entity/Transaction/Capture.js';
import { Refund } from '../../../3-Domain/Entity/Transaction/Refund.js';

export interface IGateways {
    sendTransaction(transaction: TransactionDTO): Promise<Transaction>;
    searchTransaction(numberRequest: string): Promise<TransactionComplete>;
    captureTransaction(numberRequest: string, amount: number): Promise<Capture>;
    cancelReversalTransaction(numberRequest: string): Promise<Refund>;
}
