import { IGateways } from '../../../Shared/Interfaces/Gateway/IGateways';
import { TransactionDTOType } from '../../../Shared/DTO/TransactionDTOType';
import { MapperSend } from './Mapper/Transaction/MapperSend';
import { MapperSearch } from './Mapper/Transaction/MapperSearch';
import { MapperCapture } from './Mapper/Transaction/MapperCapture';
import { MapperCancel } from './Mapper/Transaction/MapperCancel';
import { CaptureTransactionDTOType } from '../../../Shared/DTO/CaptureTransactionDTOType';
import { SearchTransactionDTOType } from '../../../Shared/DTO/SearchTransactionDTOType';
import { IConnectCieloAPI } from './Interface/IConnectCieloAPI';
import { TransactionOrderDTOType } from '../../../Shared/DTO/Order/TransactionOrderDTOType';
import { CancelOrderDTOType } from '../../../Shared/DTO/Order/CancelOrderDTOType';
import { SearchTransactionOrderDTOType } from '../../../Shared/DTO/Order/SearchTransactionOrderType';
import { CancelTransactionDTO } from '../../../Shared/DTO/CancelTransactionDTO';
import { CaptureOrderDTOType } from '../../../Shared/DTO/Order/CaptureOrderDTOType';

export class GatewayCieloAdapter implements IGateways {
    constructor(private readonly connectAPI: IConnectCieloAPI) {}

    async sendTransaction(transaction: TransactionDTOType): Promise<TransactionOrderDTOType> {
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

    async cancelTransaction(cancelTransactionDTO: CancelTransactionDTO): Promise<CancelOrderDTOType> {
        const returnAPI = await this.connectAPI.cancelTransaction(cancelTransactionDTO);

        return new Promise(function (resolve) {
            resolve(MapperCancel.toCancelTransaction(returnAPI));
        });
    }
}
