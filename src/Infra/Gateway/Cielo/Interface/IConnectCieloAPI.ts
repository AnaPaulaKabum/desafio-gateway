import { CancelRequest } from '../../../../Application/Request/CancelRequest';
import { CaptureTransactionDTO } from '../../../../Shared/DTO/CaptureTransactionDTO';
import { SearchTransactionDTOType } from '../../../../Shared/DTO/SearchTransactionDTOType';
import { TransactionDTOType } from '../../../../Shared/DTO/TransactionDTOType';

export interface IConnectCieloAPI {
    sendTransaction(transaction: TransactionDTOType): Promise<any>;
    searchTransaction(searchRequest: SearchTransactionDTOType): Promise<any>;
    captureTransaction(captureTransactionDTO: CaptureTransactionDTO): Promise<any>;
    cancelTransaction(cancelRequest: CancelRequest): Promise<any>;
}
