import { CaptureTransactionDTO } from '../../../Shared/DTO/CaptureTransactionDTO';
import { SearchTransactionDTO } from '../../../Shared/DTO/SearchTransactionDTO';
import { TransactionDTO } from '../../../Shared/DTO/TransactionDTO';
import { IHTTP } from '../../../Shared/Interfaces/HTTP/IHTTP';
import { IConnectRedeAPI } from './Interface/IConnectRedeAPI';

export class ConnectRede implements IConnectRedeAPI {
    constructor(private readonly http: IHTTP) {}

    sendTransaction(transaction: TransactionDTO): Promise<any> {
        throw new Error('Method not implemented.');
    }
    searchTransaction(searchRequest: SearchTransactionDTO): Promise<any> {
        return this.http.get();
    }
    captureTransaction(captureTransactionDTO: CaptureTransactionDTO): Promise<any> {
        throw new Error('Method not implemented.');
    }
    cancelTransaction(numberRequest: string): Promise<any> {
        throw new Error('Method not implemented.');
    }
}
