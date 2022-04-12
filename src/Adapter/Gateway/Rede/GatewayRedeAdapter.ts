import { MapperTrasactionRede } from './Mapper/Transaction/MapperTrasactionRede';
import { TransactionOrder } from '../../../Domain/Entity/Transaction/ValueObject/TransactionOrder';
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
import { RefundOrder } from '../../../Domain/Entity/Transaction/ValueObject/RefundOrder';
import { CaptureTransactionDTO } from '../../../Shared/DTO/CaptureTransactionDTO';
import { SearchTransactionDTO } from '../../../Shared/DTO/SearchTransactionDTO';

export class GatewayRedeAdapter implements IGateways {
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

    async cancelReversalTransaction(numberRequest: string): Promise<RefundOrder> {
        const returnAPI = await MockAPICancelRede.cancel(numberRequest);

        return new Promise(function (resolve) {
            resolve(MapperCancel.toCancelTransaction(returnAPI, numberRequest));
        });
    }
}
