import { TransactionDTO } from '../../DTO/TransactionDTO';
import { SearchRequest } from '../../../Application/Request/SearchRequest';
import { CaptureTransactionDTO } from '../../DTO/CaptureTransactionDTO';
import { TransactionOrderDTO } from '../../DTO/Order/TransactionOrderDTO';
import { CaptureOrderDTO } from '../../DTO/Order/CaptureOrderDTO';
import { CancelOrderDTO } from '../../DTO/Order/CancelOrderDTO';
import { SearchTransactionOrderDTO } from '../../DTO/Order/SearchTransactionOrder';

export interface IGateways {
    sendTransaction(transaction: TransactionDTO): Promise<TransactionOrderDTO>;
    searchTransaction(searchRequest: SearchRequest): Promise<SearchTransactionOrderDTO>;
    captureTransaction(captureTransactionDTO: CaptureTransactionDTO): Promise<CaptureOrderDTO>;
    cancelTransaction(numberRequest: string): Promise<CancelOrderDTO>;
}
