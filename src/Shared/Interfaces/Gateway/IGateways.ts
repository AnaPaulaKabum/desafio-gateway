import { TransactionDTO } from '../../DTO/TransactionDTO';
import { SearchTransactionOrder } from '../../../Domain/Entity/Transaction/SearchTransactionOrder';
import { CaptureOrder } from '../../../Domain/Entity/Transaction/CaptureOrder';
import { CancelOrder } from '../../../Domain/Entity/Transaction/CancelOrder';
import { SearchRequest } from '../../../Application/Request/SearchRequest';
import { CaptureTransactionDTO } from '../../DTO/CaptureTransactionDTO';
import { TransactionOrderDTO } from '../../DTO/Order/TransactionOrderDTO';

export interface IGateways {
    sendTransaction(transaction: TransactionDTO): Promise<TransactionOrderDTO>;
    searchTransaction(searchRequest: SearchRequest): Promise<SearchTransactionOrder>;
    captureTransaction(captureTransactionDTO: CaptureTransactionDTO): Promise<CaptureOrder>;
    cancelTransaction(numberRequest: string): Promise<CancelOrder>;
}
