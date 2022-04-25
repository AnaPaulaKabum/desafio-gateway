import { IGateways } from '../../../Shared/Interfaces/Gateway/IGateways';
import { TransactionDTO } from '../../../Shared/DTO/TransactionDTO';
import { MapperSend } from './Mapper/Transaction/MapperSend';
import { SearchTransactionOrder } from '../../../Domain/Entity/Transaction/SearchTransactionOrder';
import { MapperSearch } from './Mapper/Transaction/MapperSearch';
import { MapperCapture } from './Mapper/Transaction/MapperCapture';
import { MapperCancel } from './Mapper/Transaction/MapperCancel';
import { CaptureTransactionDTO } from '../../../Shared/DTO/CaptureTransactionDTO';
import { SearchTransactionDTO } from '../../../Shared/DTO/SearchTransactionDTO';
import { IConnectCieloAPI } from './Interface/IConnectCieloAPI';
import { TransactionOrderDTO } from '../../../Shared/DTO/Order/TransactionOrderDTO';
import { CaptureOrderDTO } from '../../../Shared/DTO/Order/CaptureOrderDTO';
import { CancelOrderDTO } from '../../../Shared/DTO/Order/CancelOrderDTO';
import { SearchTransactionOrderDTO } from '../../../Shared/DTO/Order/SearchTransactionOrder';

export class GatewayCieloAdapter implements IGateways {
    constructor(private readonly connectAPI: IConnectCieloAPI) {}

    async sendTransaction(transaction: TransactionDTO): Promise<TransactionOrderDTO> {
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

    async cancelTransaction(numberRequest: string): Promise<CancelOrderDTO> {
        const returnAPI = await this.connectAPI.cancelTransaction(numberRequest);

        return new Promise(function (resolve) {
            resolve(MapperCancel.toCancelTransaction(returnAPI));
        });
    }
}
