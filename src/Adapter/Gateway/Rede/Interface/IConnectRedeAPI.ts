import { CaptureTransactionDTO } from '../../../../Shared/DTO/CaptureTransactionDTO';
import { SearchTransactionDTO } from '../../../../Shared/DTO/SearchTransactionDTO';
import { TransactionRedeCreateRequest } from '../Request/TransactionRedeCreateRequest';

export interface IConnectRedeAPI {
    sendTransaction(transaction: TransactionRedeCreateRequest): Promise<any>;
    searchTransaction(searchRequest: SearchTransactionDTO): Promise<any>;
    captureTransaction(captureTransactionDTO: CaptureTransactionDTO): Promise<any>;
    cancelTransaction(numberRequest: string): Promise<any>;
}
