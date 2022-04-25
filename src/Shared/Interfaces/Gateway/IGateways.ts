import { TransactionDTO } from '../../DTO/TransactionDTO';
import { SearchTransactionOrder } from '../../../Domain/Entity/Transaction/SearchTransactionOrder';
import { SearchRequest } from '../../../Application/Request/SearchRequest';
import { CaptureTransactionDTO } from '../../DTO/CaptureTransactionDTO';
import { TransactionOrderDTO } from '../../DTO/Order/TransactionOrderDTO';
import { CaptureOrderDTO } from '../../DTO/Order/CaptureOrderDTO';
import { CancelOrderDTO } from '../../DTO/Order/CancelOrderDTO';

export interface IGateways {
    sendTransaction(transaction: TransactionDTO): Promise<TransactionOrderDTO>;
    searchTransaction(searchRequest: SearchRequest): Promise<SearchTransactionOrder>;
    captureTransaction(captureTransactionDTO: CaptureTransactionDTO): Promise<CaptureOrderDTO>;
    cancelTransaction(numberRequest: string): Promise<CancelOrderDTO>;
}
