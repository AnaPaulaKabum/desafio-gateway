import { MapperTrasactionRede } from './Mapper/Transaction/MapperTrasactionRede';
import { TransactionOrder } from '../../../Domain/Entity/Transaction/TransactionOrder';
import { IGateways } from '../../../Shared/Interfaces/Gateway/IGateways';
import { MockAPISendRede } from './Mock/API/MockAPISendRede';
import { MapperSend } from './Mapper/Transaction/MapperSend';
import { MockAPISearchRede } from './Mock/API/MockAPISearchRede';
import { MapperSearch } from './Mapper/Transaction/MapperSearch';
import { MockAPICaptureRede } from './Mock/API/MockAPICaptureRede';
import { MapperCapture } from './Mapper/Transaction/MapperCapture';
import { TransactionDTO } from '../../../Shared/DTO/TransactionDTO';
import { MockAPICancelRede } from './Mock/API/MockAPICancelRede';
import { MapperCancel } from './Mapper/Transaction/MapperCancel';
import { SearchTransactionOrder } from '../../../Domain/Entity/Transaction/SearchTransactionOrder';
import { CaptureOrder } from '../../../Domain/Entity/Transaction/CaptureOrder';
import { CancelOrder } from '../../../Domain/Entity/Transaction/CancelOrder';
import { CaptureTransactionDTO } from '../../../Shared/DTO/CaptureTransactionDTO';
import { SearchTransactionDTO } from '../../../Shared/DTO/SearchTransactionDTO';
import { TransactionRepository } from '../../Repository/Transaction/TransactionRepository';

export class GatewayRedeAdapter implements IGateways {
    constructor(private readonly transactionRepository: TransactionRepository) {}

    async sendTransaction(transaction: TransactionDTO): Promise<TransactionOrder> {
        const transactionRedeRequest = MapperTrasactionRede.toTransactionRede(transaction);
        const returnAPI = await MockAPISendRede.send(transactionRedeRequest);

        return new Promise(function (resolve) {
            resolve(MapperSend.toTransaction(returnAPI, transaction.kind));
        });
    }

    async searchTransaction(searchRequest: SearchTransactionDTO): Promise<SearchTransactionOrder> {
        let returnAPI;
        if (!searchRequest.numberRequest) {
            returnAPI = await MockAPISearchRede.searchNumberRequest(searchRequest.numberRequest);
        } else {
            returnAPI = await MockAPISearchRede.searchTid(searchRequest.tid);
        }
        return new Promise(function (resolve) {
            resolve(MapperSearch.toTransactionComplete(returnAPI));
        });
    }

    async captureTransaction(captureTransactionDTO: CaptureTransactionDTO): Promise<CaptureOrder> {
        const returnAPI = await MockAPICaptureRede.capture(
            captureTransactionDTO.numberRequest,
            captureTransactionDTO.amount,
        );

        return new Promise(function (resolve) {
            resolve(MapperCapture.toCapture(returnAPI, captureTransactionDTO.amount));
        });
    }

    async cancelTransaction(numberRequest: string): Promise<CancelOrder> {
        const returnAPI = await MockAPICancelRede.cancel(numberRequest);
        const transaction = await this.transactionRepository.findOne(numberRequest);

        return new Promise(function (resolve) {
            resolve(MapperCancel.toCancelTransaction(returnAPI, transaction));
        });
    }
}
