import { MapperTrasactionRede } from './Mapper/Transaction/MapperTrasactionRede.js';
import { Transaction } from '../../../3-Domain/Entity/Transaction/Transaction.js';
import { IGateways } from '../../../5-Shared/Interfaces/Gateway/IGateways.js';
import { MockAPISendRede } from './Mock/API/MockAPISendRede.js';
import { MapperSend } from './Mapper/Transaction/MapperSend.js';
import { MockAPISearchRede } from './Mock/API/MockAPISearchRede.js';
import { MapperSearch } from './Mapper/Transaction/MapperSearch.js';
import { MockAPICaptureRede } from './Mock/API/MockAPICaptureRede.js';
import { MapperCapture } from './Mapper/Transaction/MapperCapture.js';
import { TransactionDTO } from '../../../5-Shared/DTO/TransactionDTO.js';
import { MockAPICancelRede } from './Mock/API/MockAPICancelRede.js';
import { MapperCancel } from './Mapper/Transaction/MapperCancel.js';
import { TransactionComplete } from '../../../3-Domain/Entity/Transaction/TransactionComplete.js';
import { Capture } from '../../../3-Domain/Entity/Transaction/Capture.js';
import { Refund } from '../../../3-Domain/Entity/Transaction/Refund.js';
import { SearchRequest } from '../../../1-Application/Request/SearchRequest.js';

export class GatewayRedeAdapter implements IGateways {
    async sendTransaction(transaction: TransactionDTO): Promise<Transaction> {
        console.log('..sendTransaction(Adapter)');
        const transactionRedeRequest = MapperTrasactionRede.toTransactionRede(transaction);
        const returnAPI = await MockAPISendRede.send(transactionRedeRequest);

        return new Promise(function (resolve) {
            resolve(MapperSend.toTransaction(returnAPI, transaction.kind));
        });
    }

    async searchTransaction(searchRequest: SearchRequest): Promise<TransactionComplete> {
        console.log('..searchTransaction(Adapter)');
        const returnAPI = await MockAPISearchRede.search(searchRequest.numberRequest);

        return new Promise(function (resolve) {
            resolve(MapperSearch.toTransactionComplete(returnAPI));
        });
    }

    async captureTransaction(numberRequest: string, amount: number): Promise<Capture> {
        console.log('..captureTransaction(Adapter)');
        const returnAPI = await MockAPICaptureRede.capture(numberRequest, amount);

        return new Promise(function (resolve) {
            resolve(MapperCapture.toCapture(returnAPI, amount));
        });
    }

    async cancelReversalTransaction(numberRequest: string): Promise<Refund> {
        console.log('..cancelReversalTransaction(Adapter)');
        const returnAPI = await MockAPICancelRede.cancel(numberRequest);

        return new Promise(function (resolve) {
            resolve(MapperCancel.toCancelTransaction(returnAPI, numberRequest));
        });
    }
}
