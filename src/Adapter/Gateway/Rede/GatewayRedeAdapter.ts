import { IGateways } from '../../../Shared/Interfaces/Gateway/IGateways';
import { MapperSend } from './Mapper/Transaction/MapperSend';
import { MapperSearch } from './Mapper/Transaction/MapperSearch';
import { MapperCapture } from './Mapper/Transaction/MapperCapture';
import { TransactionDTO } from '../../../Shared/DTO/TransactionDTO';
import { MapperCancel } from './Mapper/Transaction/MapperCancel';
import { CaptureTransactionDTO } from '../../../Shared/DTO/CaptureTransactionDTO';
import { SearchTransactionDTO } from '../../../Shared/DTO/SearchTransactionDTO';
import { TransactionOrderDTO } from '../../../Shared/DTO/Order/TransactionOrderDTO';
import { CaptureOrderDTO } from '../../../Shared/DTO/Order/CaptureOrderDTO';
import { CancelOrderDTO } from '../../../Shared/DTO/Order/CancelOrderDTO';
import { SearchTransactionOrderDTO } from '../../../Shared/DTO/Order/SearchTransactionOrder';
import { CancelTransactionDTO } from '../../../Shared/DTO/CancelTransactionDTO';
import { IHTTP } from '../../../Shared/Interfaces/HTTP/IHTTP';

export class GatewayRedeAdapter implements IGateways {
    constructor(private readonly http: IHTTP) {
        const baseURL = 'https://sandbox-erede.useredecloud.com.br';
        const username = '23172018';
        const password = '63c968b7b58a46a5b260fe812d4a2fb0';
        this.http.setAuth(username, password);
        this.http.setBaseUrl(baseURL);
    }

    async sendTransaction(transactionDTO: TransactionDTO): Promise<TransactionOrderDTO> {
        const data = {
            //capture: false,
            kind: transactionDTO.kind,
            reference: transactionDTO.numberRequest,
            amount: transactionDTO.amount,
            installments: transactionDTO.installments,
            cardholderName: transactionDTO.cardHolderName,
            cardNumber: transactionDTO.cardNumber,
            expirationMonth: transactionDTO.expirationMonth,
            expirationYear: transactionDTO.expirationYear,
            securityCode: transactionDTO.cardSecurityCode,
            softDescriptor: transactionDTO.softDescriptor,
            /*subscription: false,
            origin: 1,
            distributorAffiliation: 0,
            brandTid: 'string',
            storageCard: '1',*/
        };
        const endpoint = '/v1/transactions/';
        const returnAPI = await this.http.post(endpoint, data);

        return new Promise(function (resolve) {
            resolve(MapperSend.toTransaction(returnAPI, transactionDTO.kind));
        });
    }

    async searchTransaction(searchTransactionDTO: SearchTransactionDTO): Promise<SearchTransactionOrderDTO> {
        const endpoint = '/v1/transactions/' + searchTransactionDTO.numberRequest;
        const returnAPI = this.http.get(endpoint);

        return new Promise(function (resolve) {
            resolve(MapperSearch.toTransactionComplete(returnAPI));
        });
    }

    async captureTransaction(captureTransactionDTO: CaptureTransactionDTO): Promise<CaptureOrderDTO> {
        const endpoint = '/v1/transactions/' + captureTransactionDTO.tid;
        const data = { amount: captureTransactionDTO.amount };
        const returnAPI = await this.http.put(endpoint, data);

        return new Promise(function (resolve) {
            resolve(MapperCapture.toCapture(returnAPI, captureTransactionDTO.amount));
        });
    }

    async cancelTransaction(cancelTransactionDTO: CancelTransactionDTO): Promise<CancelOrderDTO> {
        const resource = '/v1/transactions/' + cancelTransactionDTO.tid + '/refunds';
        const data = { amount: cancelTransactionDTO.amount };
        const returnAPI = await this.http.post(resource, data);

        return new Promise(function (resolve) {
            resolve(MapperCancel.toCancelTransaction(returnAPI));
        });
    }
}
