import { TransactionDTO } from '../../DTO/TransactionDTO';
import { SearchRequest } from '../../../Application/Request/SearchRequest';
import { CaptureTransactionDTO } from '../../DTO/CaptureTransactionDTO';
import { TransactionOrderDTOType } from '../../DTO/Order/TransactionOrderDTOType';
import { CaptureOrderDTO } from '../../DTO/Order/CaptureOrderDTO';
import { CancelOrderDTO } from '../../DTO/Order/CancelOrderDTO';
import { SearchTransactionOrderDTO } from '../../DTO/Order/SearchTransactionOrder';
import { CancelTransactionDTO } from '../../DTO/CancelTransactionDTO';

export interface IGateways {
    sendTransaction(transaction: TransactionDTO): Promise<TransactionOrderDTOType>;
    searchTransaction(searchRequest: SearchRequest): Promise<SearchTransactionOrderDTO>;
    captureTransaction(captureTransactionDTO: CaptureTransactionDTO): Promise<CaptureOrderDTO>;
    cancelTransaction(cancelTransactionDTO: CancelTransactionDTO): Promise<CancelOrderDTO>;
}
