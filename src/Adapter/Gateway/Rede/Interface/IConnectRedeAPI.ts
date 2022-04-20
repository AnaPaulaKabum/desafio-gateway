import { CaptureTransactionDTO } from '../../../../Shared/DTO/CaptureTransactionDTO';
import { SearchTransactionDTO } from '../../../../Shared/DTO/SearchTransactionDTO';
import { TransactionDTO } from '../../../../Shared/DTO/TransactionDTO';

export interface IConnectRedeAPI {
    sendTransaction(transaction: TransactionDTO): Promise<any>;
    searchTransaction(searchRequest: SearchTransactionDTO): Promise<any>;
    captureTransaction(captureTransactionDTO: CaptureTransactionDTO): Promise<any>;
    cancelTransaction(numberRequest: string): Promise<any>;
}
