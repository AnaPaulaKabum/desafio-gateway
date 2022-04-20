import { IGateways } from '../../../Shared/Interfaces/Gateway/IGateways';
import { TransactionOrder } from '../../../Domain/Entity/Transaction/TransactionOrder';
import { TransactionDTO } from '../../../Shared/DTO/TransactionDTO';
import { MapperSend } from './Mapper/Transaction/MapperSend';
import { SearchTransactionOrder } from '../../../Domain/Entity/Transaction/SearchTransactionOrder';
import { MapperSearch } from './Mapper/Transaction/MapperSearch';
import { MapperCapture } from './Mapper/Transaction/MapperCapture';
import { CaptureOrder } from '../../../Domain/Entity/Transaction/CaptureOrder';
import { MapperCancel } from './Mapper/Transaction/MapperCancel';
import { CancelOrder } from '../../../Domain/Entity/Transaction/CancelOrder';
import { CaptureTransactionDTO } from '../../../Shared/DTO/CaptureTransactionDTO';
import { SearchTransactionDTO } from '../../../Shared/DTO/SearchTransactionDTO';
import { IConnectCieloAPI } from './Interface/IConnectCieloAPI';
import { ITransactionRepository } from '../../../Shared/Interfaces/Repository/ITransitionRepository';

export class GatewayCieloAdapter implements IGateways {
    constructor(
        private readonly transactionRepository: ITransactionRepository,
        private readonly connectAPI: IConnectCieloAPI,
    ) {}

    async sendTransaction(transaction: TransactionDTO): Promise<TransactionOrder> {
        const returnAPI = await this.connectAPI.sendTransaction(transaction);

        return new Promise(function (resolve) {
            resolve(MapperSend.toTransaction(returnAPI, transaction.kind));
        });
    }

    async searchTransaction(searchRequest: SearchTransactionDTO): Promise<SearchTransactionOrder> {
        let returnAPI = await this.connectAPI.searchTransaction(searchRequest);

        return new Promise(function (resolve) {
            resolve(MapperSearch.toTransactionComplete(returnAPI));
        });
    }

    async captureTransaction(captureTransactionDTO: CaptureTransactionDTO): Promise<CaptureOrder> {
        const returnAPI = await this.connectAPI.captureTransaction(captureTransactionDTO);

        return new Promise(function (resolve) {
            resolve(MapperCapture.toCapture(returnAPI, captureTransactionDTO));
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
