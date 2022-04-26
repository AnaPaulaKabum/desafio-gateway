import { IGateways } from '../../../Shared/Interfaces/Gateway/IGateways';
import { MapperSend } from './Mapper/Transaction/MapperSend';
import { MapperSearch } from './Mapper/Transaction/MapperSearch';
import { MapperCapture } from './Mapper/Transaction/MapperCapture';
import { TransactionDTO } from '../../../Shared/DTO/TransactionDTO';
import { MapperCancel } from './Mapper/Transaction/MapperCancel';
import { CaptureTransactionDTO } from '../../../Shared/DTO/CaptureTransactionDTO';
import { SearchTransactionDTO } from '../../../Shared/DTO/SearchTransactionDTO';
import { IConnectRedeAPI } from './Interface/IConnectRedeAPI';
import { TransactionOrderDTO } from '../../../Shared/DTO/Order/TransactionOrderDTO';
import { CaptureOrderDTO } from '../../../Shared/DTO/Order/CaptureOrderDTO';
import { CancelOrderDTO } from '../../../Shared/DTO/Order/CancelOrderDTO';
import { SearchTransactionOrderDTO } from '../../../Shared/DTO/Order/SearchTransactionOrder';

export class GatewayRedeAdapter implements IGateways {
    constructor(private readonly connectAPI: IConnectRedeAPI) {}

    async sendTransaction(transaction: TransactionDTO): Promise<TransactionOrderDTO> {
        const returnAPI = await this.connectAPI.sendTransaction(transaction);

        return new Promise(function (resolve) {
            resolve(MapperSend.toTransaction(returnAPI, transaction.kind));
        });
    }

    async searchTransaction(searchRequest: SearchTransactionDTO): Promise<SearchTransactionOrderDTO> {
        const returnAPI = await this.connectAPI.searchTransaction(searchRequest);

        return new Promise(function (resolve) {
            resolve(MapperSearch.toTransactionComplete(returnAPI));
        });
    }

    async captureTransaction(captureTransactionDTO: CaptureTransactionDTO): Promise<CaptureOrderDTO> {
        const returnAPI = await this.connectAPI.captureTransaction(captureTransactionDTO);

        return new Promise(function (resolve) {
            resolve(MapperCapture.toCapture(returnAPI, captureTransactionDTO.amount));
        });
    }

    async cancelTransaction(numberRequest: string): Promise<CancelOrderDTO> {
        const returnAPI = await this.connectAPI.cancelTransaction(numberRequest);
        return new Promise(function (resolve) {
            resolve(MapperCancel.toCancelTransaction(returnAPI));
        });
    }
}
