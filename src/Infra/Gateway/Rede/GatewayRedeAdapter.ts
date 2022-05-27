import { IGateways } from '../../../Shared/Interfaces/Gateway/IGateways';
import { MapperSend } from './Mapper/Transaction/MapperSend';
import { MapperSearch } from './Mapper/Transaction/MapperSearch';
import { MapperCapture } from './Mapper/Transaction/MapperCapture';
import { TransactionDTOType } from '../../../Shared/DTO/TransactionDTOType';
import { MapperCancel } from './Mapper/Transaction/MapperCancel';
import { CaptureTransactionDTO } from '../../../Shared/DTO/CaptureTransactionDTO';
import { SearchTransactionDTOType } from '../../../Shared/DTO/SearchTransactionDTOType';
import { TransactionOrderDTOType } from '../../../Shared/DTO/Order/TransactionOrderDTOType';
import { CaptureOrderDTOType } from '../../../Shared/DTO/Order/CaptureOrderDTOType';
import { CancelOrderDTOType } from '../../../Shared/DTO/Order/CancelOrderDTOType';
import { SearchTransactionOrderDTOType } from '../../../Shared/DTO/Order/SearchTransactionOrderType';
import { CancelTransactionDTO } from '../../../Shared/DTO/CancelTransactionDTO';
import { IHTTP } from '../../../Shared/Interfaces/HTTP/IHTTP';
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

    async captureTransaction(captureTransactionDTO: CaptureTransactionDTO): Promise<CaptureOrderDTOType> {
        const endpoint = '/v1/transactions/' + captureTransactionDTO.tid;
        const data = { amount: captureTransactionDTO.amount };
        const returnAPI = await this.http.put(endpoint, data);

        if (returnAPI.isSuccess)
            return new Promise(function (resolve) {
                resolve(MapperCapture.toCapture(returnAPI, captureTransactionDTO.amount));
            });
        throw new Error(translateErrorCodeAPI(returnAPI.error.returnCode));
    }

    async cancelTransaction(cancelTransactionDTO: CancelTransactionDTO): Promise<CancelOrderDTOType> {
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
