import { TransactionDTO } from '../../DTO/TransactionDTO.js';
import { TransactionOrder } from '../../../3-Domain/Entity/Transaction/TransactionOrder.js';
import { SearchTransactionOrder } from '../../../3-Domain/Entity/Transaction/SearchTransactionOrder.js';
import { CaptureOrder } from '../../../3-Domain/Entity/Transaction/CaptureOrder.js';
import { RefundOrder } from '../../../3-Domain/Entity/Transaction/RefundOrder.js';
import { SearchRequest } from '../../../1-Application/Request/SearchRequest.js';
import { CaptureTransactionDTO } from '../../DTO/CaptureTransactionDTO.js';

export interface IGateways {
    sendTransaction(transaction: TransactionDTO): Promise<TransactionOrder>;
    searchTransaction(searchRequest: SearchRequest): Promise<SearchTransactionOrder>;
    captureTransaction(captureTransactionDTO: CaptureTransactionDTO): Promise<CaptureOrder>;
    cancelReversalTransaction(numberRequest: string): Promise<RefundOrder>;
}
