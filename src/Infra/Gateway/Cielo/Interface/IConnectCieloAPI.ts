import { CancelRequest } from '../../../../Application/Request/CancelRequest';
import { CaptureTransactionDTO } from '../../../../Shared/DTO/CaptureTransactionDTO';
import { SearchTransactionDTO } from '../../../../Shared/DTO/SearchTransactionDTO';
import { TransactionDTOType } from '../../../../Shared/DTO/TransactionDTOType';

export interface IConnectCieloAPI {
    sendTransaction(transaction: TransactionDTOType): Promise<any>;
    searchTransaction(searchRequest: SearchTransactionDTO): Promise<any>;
    captureTransaction(captureTransactionDTO: CaptureTransactionDTO): Promise<any>;
    cancelTransaction(cancelRequest: CancelRequest): Promise<any>;
}
