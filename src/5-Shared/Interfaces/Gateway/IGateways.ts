import { TransactionDTO } from '../../DTO/TransactionDTO.js';
import { Transaction } from '../../../3-Domain/Entity/Transaction/Transaction.js';
import { TransactionComplete } from '../../../3-Domain/Entity/Transaction/TransactionComplete.js';
import { CaptureOrder } from '../../../3-Domain/Entity/Transaction/CaptureOrder.js';
import { RefundOrder } from '../../../3-Domain/Entity/Transaction/RefundOrder.js';
import { SearchRequest } from '../../../1-Application/Request/SearchRequest.js';
import { CaptureTransactionDTO } from '../../DTO/CaptureTransactionDTO.js';

export interface IGateways {
    sendTransaction(transaction: TransactionDTO): Promise<Transaction>;
    searchTransaction(searchRequest: SearchRequest): Promise<TransactionComplete>;
    captureTransaction(captureTransactionDTO: CaptureTransactionDTO): Promise<CaptureOrder>;
    cancelReversalTransaction(numberRequest: string): Promise<RefundOrder>;
}
