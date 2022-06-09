import { IGateways } from '../../../Domain/Shared/Interfaces/Gateway/IGateways';
import { MapperSend } from './Mapper/Transaction/MapperSend';
import { MapperSearch } from './Mapper/Transaction/MapperSearch';
import { MapperCapture } from './Mapper/Transaction/MapperCapture';
import { TransactionDTOType } from '../../../Domain/Shared/DTO/TransactionDTOType';
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

export class GatewayRedeAdapter implements IGateways {
    constructor(private readonly http: IHTTP) {}

    async sendTransaction(transactionDTO: TransactionDTOType): Promise<TransactionOrderDTOType> {
        const endpoint = '/v1/transactions/';
        const data = {
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
        };
        const returnAPI = await this.http.post(endpoint, data);

        if (returnAPI.isSuccess)
            return new Promise(function (resolve) {
                resolve(MapperSend.toTransaction(returnAPI.getValue(), transactionDTO.kind));
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
