import { CancelRequest } from '../../../Application/Request/CancelRequest';
import { CaptureTransactionDTO } from '../../../Shared/DTO/CaptureTransactionDTO';
import { SearchTransactionDTO } from '../../../Shared/DTO/SearchTransactionDTO';
import { TransactionDTO } from '../../../Shared/DTO/TransactionDTO';
import { IHTTP } from '../../../Shared/Interfaces/HTTP/IHTTP';
import { IConnectRedeAPI } from './Interface/IConnectRedeAPI';

export class ConnectRede implements IConnectRedeAPI {
    constructor(private readonly http: IHTTP) {
        const baseURL = 'https://sandbox-erede.useredecloud.com.br';
        const username = '23172018';
        const password = '63c968b7b58a46a5b260fe812d4a2fb0';
        this.http.setAuth(username, password);
        this.http.setBaseUrl(baseURL);
    }

    sendTransaction(transaction: TransactionDTO): Promise<any> {
        const data = {};
        const endpoint = '';
        return this.http.post(endpoint, data);
    }
    searchTransaction(searchRequest: SearchTransactionDTO): Promise<any> {
        const endpoint = '/v1/transactions/' + searchRequest.numberRequest;
        return this.http.get(endpoint);
    }
    captureTransaction(captureTransactionDTO: CaptureTransactionDTO): Promise<any> {
        const endpoint = '/v1/transactions/' + captureTransactionDTO.numberRequest;
        const data = { amount: captureTransactionDTO.amount };
        return this.http.put(endpoint, data);
    }
    cancelTransaction(cancelRequest: CancelRequest): Promise<any> {
        const resource = '/v1/transactions/' + cancelRequest.numberRequest + '/refunds';
        const data = { amount: 100 };
        return this.http.post(resource, data);
    }
}
