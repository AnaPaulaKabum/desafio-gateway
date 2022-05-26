import { TransactionDTO } from '../../DTO/TransactionDTO';
import { SearchRequest } from '../../../Application/Request/SearchRequest';
import { CaptureTransactionDTO } from '../../DTO/CaptureTransactionDTO';
import { TransactionOrderDTOType } from '../../DTO/Order/TransactionOrderDTOType';
import { CancelOrderDTOType } from '../../DTO/Order/CancelOrderDTOType';
import { CancelTransactionDTO } from '../../DTO/CancelTransactionDTO';
import { SearchTransactionOrderDTOType } from '../../DTO/Order/SearchTransactionOrderType';
import { CaptureOrderDTOType } from '../../DTO/Order/CaptureOrderDTOType';

export interface IGateways {
    sendTransaction(transaction: TransactionDTO): Promise<TransactionOrderDTOType>;
    searchTransaction(searchRequest: SearchRequest): Promise<SearchTransactionOrderDTOType>;
    captureTransaction(captureTransactionDTO: CaptureTransactionDTO): Promise<CaptureOrderDTOType>;
    cancelTransaction(cancelTransactionDTO: CancelTransactionDTO): Promise<CancelOrderDTOType>;
}
