import { IGateways } from '../../../Shared/Interfaces/Gateway/IGateways';
import { TransactionDTO } from '../../../Shared/DTO/TransactionDTO';
import { MapperSend } from './Mapper/Transaction/MapperSend';
import { MapperSearch } from './Mapper/Transaction/MapperSearch';
import { MapperCapture } from './Mapper/Transaction/MapperCapture';
import { MapperCancel } from './Mapper/Transaction/MapperCancel';
import { CaptureTransactionDTO } from '../../../Shared/DTO/CaptureTransactionDTO';
import { SearchTransactionDTO } from '../../../Shared/DTO/SearchTransactionDTO';
import { IConnectCieloAPI } from './Interface/IConnectCieloAPI';
import { TransactionOrderDTOType } from '../../../Shared/DTO/Order/TransactionOrderDTOType';
import { CaptureOrderDTO } from '../../../Shared/DTO/Order/CaptureOrderDTO';
import { CancelOrderDTO } from '../../../Shared/DTO/Order/CancelOrderDTO';
import { SearchTransactionOrderDTO } from '../../../Shared/DTO/Order/SearchTransactionOrder';
import { CancelTransactionDTO } from '../../../Shared/DTO/CancelTransactionDTO';

export class GatewayCieloAdapter implements IGateways {
    constructor(private readonly connectAPI: IConnectCieloAPI) {}

    async sendTransaction(transaction: TransactionDTO): Promise<TransactionOrderDTOType> {
        const returnAPI = await this.connectAPI.sendTransaction(transaction);

        return new Promise(function (resolve) {
            resolve(MapperSend.toTransaction(returnAPI, transaction.kind));
        });
    }

    async searchTransaction(searchRequest: SearchTransactionDTO): Promise<SearchTransactionOrderDTO> {
        let returnAPI = await this.connectAPI.searchTransaction(searchRequest);

        return new Promise(function (resolve) {
            resolve(MapperSearch.toTransactionComplete(returnAPI));
        });
    }

    async captureTransaction(captureTransactionDTO: CaptureTransactionDTO): Promise<CaptureOrderDTO> {
        const returnAPI = await this.connectAPI.captureTransaction(captureTransactionDTO);

        return new Promise(function (resolve) {
            resolve(MapperCapture.toCapture(returnAPI, captureTransactionDTO));
        });
    }

    async cancelTransaction(cancelTransactionDTO: CancelTransactionDTO): Promise<CancelOrderDTO> {
        const returnAPI = await this.connectAPI.cancelTransaction(cancelTransactionDTO);

        return new Promise(function (resolve) {
            resolve(MapperCancel.toCancelTransaction(returnAPI));
        });
    }
}
