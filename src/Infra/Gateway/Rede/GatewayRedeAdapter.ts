import { IGateways } from '../../../Domain/Shared/Interfaces/Gateway/IGateways';
import { MapperSend } from './Mapper/Transaction/MapperSend';
import { MapperSearch } from './Mapper/Transaction/MapperSearch';
import { MapperCapture } from './Mapper/Transaction/MapperCapture';
import { MapperCancel } from './Mapper/Transaction/MapperCancel';
import { CaptureTransactionDTOType } from '../../../Domain/Shared/DTO/CaptureTransactionDTOType';
import { SearchTransactionDTOType } from '../../../Domain/Shared/DTO/SearchTransactionDTOType';
import { TransactionOrderDTOType } from '../../../Domain/Shared/DTO/Order/TransactionOrderDTOType';
import { CaptureOrderDTOType } from '../../../Domain/Shared/DTO/Order/CaptureOrderDTOType';
import { CancelOrderDTOType } from '../../../Domain/Shared/DTO/Order/CancelOrderDTOType';
import { SearchTransactionOrderDTOType } from '../../../Domain/Shared/DTO/Order/SearchTransactionOrderType';
import { CancelTransactionDTOType } from '../../../Domain/Shared/DTO/CancelTransactionDTOType';
import { IHTTP } from '../../../Domain/Shared/Interfaces/HTTP/IHTTP';
import { translateErrorCodeAPI } from './RedeStatusCodeLibrary';
import { Transaction } from '../../../Domain/Entity/Transaction/Transaction';

export class GatewayRedeAdapter implements IGateways {
    constructor(private readonly http: IHTTP) {}

    async sendTransaction(transaction: Transaction): Promise<TransactionOrderDTOType> {
        const endpoint = '/v1/transactions/';
        const data = {
            kind: transaction.kind,
            reference: transaction.numberRequest.value,
            amount: transaction.amount.value,
            installments: transaction.installments.value,
            cardholderName: transaction.card.name,
            cardNumber: transaction.card.number,
            expirationMonth: transaction.card.expirationMonth,
            expirationYear: transaction.card.expirationYear,
            securityCode: transaction.card.securityCode,
            softDescriptor: transaction.softDescriptor.value,
        };
        const returnAPI = await this.http.post(endpoint, data);

        if (returnAPI.isSuccess)
            return new Promise(function (resolve) {
                resolve(MapperSend.toTransaction(returnAPI.getValue(), transaction.kind));
            });

        throw new Error(translateErrorCodeAPI(returnAPI.error.returnCode));
    }

    async searchTransaction(searchTransactionDTO: SearchTransactionDTOType): Promise<SearchTransactionOrderDTOType> {
        const endpoint = '/v1/transactions/' + searchTransactionDTO.numberRequest;
        const returnAPI = await this.http.get(endpoint);

        if (returnAPI.isSuccess)
            return new Promise(function (resolve) {
                resolve(MapperSearch.toTransactionComplete(returnAPI));
            });

        throw new Error(translateErrorCodeAPI(returnAPI.error.returnCode));
    }

    async captureTransaction(captureTransactionDTO: CaptureTransactionDTOType): Promise<CaptureOrderDTOType> {
        const endpoint = '/v1/transactions/' + captureTransactionDTO.tid;
        const data = { amount: captureTransactionDTO.amount };
        const returnAPI = await this.http.put(endpoint, data);

        if (returnAPI.isSuccess)
            return new Promise(function (resolve) {
                resolve(MapperCapture.toCapture(returnAPI, captureTransactionDTO.amount));
            });
        throw new Error(translateErrorCodeAPI(returnAPI.error.returnCode));
    }

    async cancelTransaction(cancelTransactionDTO: CancelTransactionDTOType): Promise<CancelOrderDTOType> {
        const resource = '/v1/transactions/' + cancelTransactionDTO.tid + '/refunds';
        const data = { amount: cancelTransactionDTO.amount };
        const returnAPI = await this.http.post(resource, data);

        if (returnAPI.isSuccess)
            return new Promise(function (resolve) {
                resolve(MapperCancel.toCancelTransaction(returnAPI));
            });
        throw new Error(translateErrorCodeAPI(returnAPI.error.returnCode));
    }
}
