import { TransactionDTO } from '../../DTO/TransactionDTO';
import { TransactionOrder } from '../../../3-Domain/Entity/Transaction/TransactionOrder';
import { SearchTransactionOrder } from '../../../3-Domain/Entity/Transaction/SearchTransactionOrder';
import { CaptureOrder } from '../../../3-Domain/Entity/Transaction/CaptureOrder';
import { RefundOrder } from '../../../3-Domain/Entity/Transaction/RefundOrder';
import { SearchRequest } from '../../../1-Application/Request/SearchRequest';
import { CaptureTransactionDTO } from '../../DTO/CaptureTransactionDTO';

export interface IGateways {
    sendTransaction(transaction: TransactionDTO): Promise<TransactionOrder>;
    searchTransaction(searchRequest: SearchRequest): Promise<SearchTransactionOrder>;
    captureTransaction(captureTransactionDTO: CaptureTransactionDTO): Promise<CaptureOrder>;
    cancelReversalTransaction(numberRequest: string): Promise<RefundOrder>;
}
