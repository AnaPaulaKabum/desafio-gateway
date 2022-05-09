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
import { CancelTransactionDTO } from '../../../Shared/DTO/CancelTransactionDTO';

export class GatewayRedeAdapter implements IGateways {
    constructor(private readonly connectAPI: IConnectRedeAPI) {}

    async sendTransaction(transactionDTO: TransactionDTO): Promise<TransactionOrderDTO> {
        const returnAPI = await this.connectAPI.sendTransaction(transactionDTO);

        return new Promise(function (resolve) {
            resolve(MapperSend.toTransaction(returnAPI, transactionDTO.kind));
        });
    }

    async searchTransaction(searchTransactionDTO: SearchTransactionDTO): Promise<SearchTransactionOrderDTO> {
        const returnAPI = await this.connectAPI.searchTransaction(searchTransactionDTO);

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

    async cancelTransaction(cancelTransactionDTO: CancelTransactionDTO): Promise<CancelOrderDTO> {
        const returnAPI = await this.connectAPI.cancelTransaction(cancelTransactionDTO);
        return new Promise(function (resolve) {
            resolve(MapperCancel.toCancelTransaction(returnAPI));
        });
    }
}
