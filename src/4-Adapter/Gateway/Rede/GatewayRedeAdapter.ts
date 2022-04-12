import { MapperTrasactionRede } from './Mapper/Transaction/MapperTrasactionRede';
import { TransactionOrder } from '../../../3-Domain/Entity/Transaction/TransactionOrder';
import { IGateways } from '../../../5-Shared/Interfaces/Gateway/IGateways';
import { MockAPISendRede } from './Mock/API/MockAPISendRede';
import { MapperSend } from './Mapper/Transaction/MapperSend';
import { MockAPISearchRede } from './Mock/API/MockAPISearchRede';
import { MapperSearch } from './Mapper/Transaction/MapperSearch';
import { MockAPICaptureRede } from './Mock/API/MockAPICaptureRede';
import { MapperCapture } from './Mapper/Transaction/MapperCapture';
import { TransactionDTO } from '../../../5-Shared/DTO/TransactionDTO';
import { MockAPICancelRede } from './Mock/API/MockAPICancelRede';
import { MapperCancel } from './Mapper/Transaction/MapperCancel';
import { SearchTransactionOrder } from '../../../3-Domain/Entity/Transaction/SearchTransactionOrder';
import { CaptureOrder } from '../../../3-Domain/Entity/Transaction/CaptureOrder';
import { RefundOrder } from '../../../3-Domain/Entity/Transaction/RefundOrder';
import { CaptureTransactionDTO } from '../../../5-Shared/DTO/CaptureTransactionDTO';
import { SearchTransactionDTO } from '../../../5-Shared/DTO/SearchTransactionDTO';

export class GatewayRedeAdapter implements IGateways {
    async sendTransaction(transaction: TransactionDTO): Promise<TransactionOrder> {
        console.log('..sendTransaction(Adapter)');
        const transactionRedeRequest = MapperTrasactionRede.toTransactionRede(transaction);
        const returnAPI = await MockAPISendRede.send(transactionRedeRequest);

        return new Promise(function (resolve) {
            resolve(MapperSend.toTransaction(returnAPI, transaction.kind));
        });
    }

    async searchTransaction(searchRequest: SearchTransactionDTO): Promise<SearchTransactionOrder> {
        console.log('..searchTransaction(Adapter)');

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
        console.log('..captureTransaction(Adapter)');
        const returnAPI = await MockAPICaptureRede.capture(
            captureTransactionDTO.numberRequest,
            captureTransactionDTO.amount,
        );

        return new Promise(function (resolve) {
            resolve(MapperCapture.toCapture(returnAPI, captureTransactionDTO.amount));
        });
    }

    async cancelReversalTransaction(numberRequest: string): Promise<RefundOrder> {
        console.log('..cancelReversalTransaction(Adapter)');
        const returnAPI = await MockAPICancelRede.cancel(numberRequest);

        return new Promise(function (resolve) {
            resolve(MapperCancel.toCancelTransaction(returnAPI, numberRequest));
        });
    }
}
