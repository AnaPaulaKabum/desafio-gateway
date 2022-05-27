import { CancelRequest } from '../../../../Application/Request/CancelRequest';
import { CaptureTransactionDTOType } from '../../../../Shared/DTO/CaptureTransactionDTOType';
import { SearchTransactionDTOType } from '../../../../Shared/DTO/SearchTransactionDTOType';
import { TransactionDTOType } from '../../../../Shared/DTO/TransactionDTOType';

export interface IConnectCieloAPI {
    sendTransaction(transaction: TransactionDTOType): Promise<any>;
    searchTransaction(searchRequest: SearchTransactionDTOType): Promise<any>;
    captureTransaction(captureTransactionDTO: CaptureTransactionDTOType): Promise<any>;
    cancelTransaction(cancelRequest: CancelRequest): Promise<any>;
}
