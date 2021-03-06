import { CaptureTransactionDTOType } from '../../DTO/CaptureTransactionDTOType';
import { TransactionOrderDTOType } from '../../DTO/Order/TransactionOrderDTOType';
import { CancelOrderDTOType } from '../../DTO/Order/CancelOrderDTOType';
import { CancelTransactionDTOType } from '../../DTO/CancelTransactionDTOType';
import { SearchTransactionOrderDTOType } from '../../DTO/Order/SearchTransactionOrderType';
import { CaptureOrderDTOType } from '../../DTO/Order/CaptureOrderDTOType';
import { SearchTransactionDTOType } from '../../DTO/SearchTransactionDTOType';
import { Transaction } from '../../../Entity/Transaction/Transaction';

export interface IGateways {
    sendTransaction(transaction: Transaction): Promise<TransactionOrderDTOType>;
    searchTransaction(searchRequest: SearchTransactionDTOType): Promise<SearchTransactionOrderDTOType>;
    captureTransaction(captureTransactionDTO: CaptureTransactionDTOType): Promise<CaptureOrderDTOType>;
    cancelTransaction(cancelTransactionDTO: CancelTransactionDTOType): Promise<CancelOrderDTOType>;
}
