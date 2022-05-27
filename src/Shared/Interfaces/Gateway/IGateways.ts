import { TransactionDTOType } from '../../DTO/TransactionDTOType';
import { CaptureTransactionDTOType } from '../../DTO/CaptureTransactionDTOType';
import { TransactionOrderDTOType } from '../../DTO/Order/TransactionOrderDTOType';
import { CancelOrderDTOType } from '../../DTO/Order/CancelOrderDTOType';
import { CancelTransactionDTOType } from '../../DTO/CancelTransactionDTOType';
import { SearchTransactionOrderDTOType } from '../../DTO/Order/SearchTransactionOrderType';
import { CaptureOrderDTOType } from '../../DTO/Order/CaptureOrderDTOType';
import { SearchTransactionDTOType } from '../../DTO/SearchTransactionDTOType';

export interface IGateways {
    sendTransaction(transaction: TransactionDTOType): Promise<TransactionOrderDTOType>;
    searchTransaction(searchRequest: SearchTransactionDTOType): Promise<SearchTransactionOrderDTOType>;
    captureTransaction(captureTransactionDTO: CaptureTransactionDTOType): Promise<CaptureOrderDTOType>;
    cancelTransaction(cancelTransactionDTO: CancelTransactionDTOType): Promise<CancelOrderDTOType>;
}
