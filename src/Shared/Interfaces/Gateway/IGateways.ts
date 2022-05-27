import { TransactionDTOType } from '../../DTO/TransactionDTOType';
import { CaptureTransactionDTO } from '../../DTO/CaptureTransactionDTO';
import { TransactionOrderDTOType } from '../../DTO/Order/TransactionOrderDTOType';
import { CancelOrderDTOType } from '../../DTO/Order/CancelOrderDTOType';
import { CancelTransactionDTO } from '../../DTO/CancelTransactionDTO';
import { SearchTransactionOrderDTOType } from '../../DTO/Order/SearchTransactionOrderType';
import { CaptureOrderDTOType } from '../../DTO/Order/CaptureOrderDTOType';
import { SearchTransactionDTOType } from '../../DTO/SearchTransactionDTOType';

export interface IGateways {
    sendTransaction(transaction: TransactionDTOType): Promise<TransactionOrderDTOType>;
    searchTransaction(searchRequest: SearchTransactionDTOType): Promise<SearchTransactionOrderDTOType>;
    captureTransaction(captureTransactionDTO: CaptureTransactionDTO): Promise<CaptureOrderDTOType>;
    cancelTransaction(cancelTransactionDTO: CancelTransactionDTO): Promise<CancelOrderDTOType>;
}
