import { IGateways } from '../../../Shared/Interfaces/Gateway/IGateways';
import { MapperSend } from './Mapper/Transaction/MapperSend';
import { MapperSearch } from './Mapper/Transaction/MapperSearch';
import { MapperCapture } from './Mapper/Transaction/MapperCapture';
import { TransactionDTO } from '../../../Shared/DTO/TransactionDTO';
import { MapperCancel } from './Mapper/Transaction/MapperCancel';
import { SearchTransactionOrder } from '../../../Domain/Entity/Transaction/SearchTransactionOrder';
import { CaptureOrder } from '../../../Domain/Entity/Transaction/CaptureOrder';
import { CancelOrder } from '../../../Domain/Entity/Transaction/CancelOrder';
import { CaptureTransactionDTO } from '../../../Shared/DTO/CaptureTransactionDTO';
import { SearchTransactionDTO } from '../../../Shared/DTO/SearchTransactionDTO';
import { ITransactionRepository } from '../../../Shared/Interfaces/Repository/ITransitionRepository';
import { IConnectRedeAPI } from './Interface/IConnectRedeAPI';
import { TransactionOrderDTO } from '../../../Shared/DTO/Order/TransactionOrderDTO';

export class GatewayRedeAdapter implements IGateways {
    constructor(
        private readonly transactionRepository: ITransactionRepository,
        private readonly connectAPI: IConnectRedeAPI,
    ) {}

    async sendTransaction(transaction: TransactionDTO): Promise<TransactionOrderDTO> {
        const returnAPI = await this.connectAPI.sendTransaction(transaction);

        return new Promise(function (resolve) {
            resolve(MapperSend.toTransaction(returnAPI, transaction.kind));
        });
    }

    async searchTransaction(searchRequest: SearchTransactionDTO): Promise<SearchTransactionOrder> {
        const returnAPI = await this.connectAPI.searchTransaction(searchRequest);

        return new Promise(function (resolve) {
            resolve(MapperSearch.toTransactionComplete(returnAPI));
        });
    }

    async captureTransaction(captureTransactionDTO: CaptureTransactionDTO): Promise<CaptureOrder> {
        const returnAPI = await this.connectAPI.captureTransaction(captureTransactionDTO);

        return new Promise(function (resolve) {
            resolve(MapperCapture.toCapture(returnAPI, captureTransactionDTO.amount));
        });
    }

    async cancelTransaction(numberRequest: string): Promise<CancelOrder> {
        const returnAPI = await this.connectAPI.cancelTransaction(numberRequest);
        const transaction = await this.transactionRepository.findOne(numberRequest);

        return new Promise(function (resolve) {
            resolve(MapperCancel.toCancelTransaction(returnAPI, transaction));
        });
    }
}
