import { IGateways } from '../../../Domain/Shared/Interfaces/Gateway/IGateways';
import { TransactionDTOType } from '../../../Domain/Shared/DTO/TransactionDTOType';
import { MapperSend } from './Mapper/Transaction/MapperSend';
import { MapperSearch } from './Mapper/Transaction/MapperSearch';
import { MapperCapture } from './Mapper/Transaction/MapperCapture';
import { MapperCancel } from './Mapper/Transaction/MapperCancel';
import { CaptureTransactionDTOType } from '../../../Domain/Shared/DTO/CaptureTransactionDTOType';
import { SearchTransactionDTOType } from '../../../Domain/Shared/DTO/SearchTransactionDTOType';
import { IConnectCieloAPI } from './Interface/IConnectCieloAPI';
import { TransactionOrderDTOType } from '../../../Domain/Shared/DTO/Order/TransactionOrderDTOType';
import { CancelOrderDTOType } from '../../../Domain/Shared/DTO/Order/CancelOrderDTOType';
import { SearchTransactionOrderDTOType } from '../../../Domain/Shared/DTO/Order/SearchTransactionOrderType';
import { CancelTransactionDTOType } from '../../../Domain/Shared/DTO/CancelTransactionDTOType';
import { CaptureOrderDTOType } from '../../../Domain/Shared/DTO/Order/CaptureOrderDTOType';
import { Transaction } from '../../../Domain/Entity/Transaction/Transaction';

export class GatewayCieloAdapter implements IGateways {
    constructor(private readonly connectAPI: IConnectCieloAPI) {}
    sendTransaction(transaction: Transaction): Promise<TransactionOrderDTOType> {
        throw new Error('Method not implemented.');
    }
    searchTransaction(searchRequest: SearchTransactionDTOType): Promise<SearchTransactionOrderDTOType> {
        throw new Error('Method not implemented.');
    }
    captureTransaction(captureTransactionDTO: CaptureTransactionDTOType): Promise<CaptureOrderDTOType> {
        throw new Error('Method not implemented.');
    }
    cancelTransaction(cancelTransactionDTO: CancelTransactionDTOType): Promise<CancelOrderDTOType> {
        throw new Error('Method not implemented.');
    }

    /*async sendTransaction(transaction: Transaction): Promise<TransactionOrderDTOType> {
        const returnAPI = await this.connectAPI.sendTransaction(transaction);

        return new Promise(function (resolve) {
            resolve(MapperSend.toTransaction(returnAPI, transaction.kind));
        });
    }

    async searchTransaction(searchRequest: SearchTransactionDTOType): Promise<SearchTransactionOrderDTOType> {
        let returnAPI = await this.connectAPI.searchTransaction(searchRequest);

        return new Promise(function (resolve) {
            resolve(MapperSearch.toTransactionComplete(returnAPI));
        });
    }

    async captureTransaction(captureTransactionDTO: CaptureTransactionDTOType): Promise<CaptureOrderDTOType> {
        const returnAPI = await this.connectAPI.captureTransaction(captureTransactionDTO);

        return new Promise(function (resolve) {
            resolve(MapperCapture.toCapture(returnAPI, captureTransactionDTO));
        });
    }

    async cancelTransaction(cancelTransactionDTO: CancelTransactionDTOType): Promise<CancelOrderDTOType> {
        const returnAPI = await this.connectAPI.cancelTransaction(cancelTransactionDTO);

        return new Promise(function (resolve) {
            resolve(MapperCancel.toCancelTransaction(returnAPI));
        });
    }*/
}
