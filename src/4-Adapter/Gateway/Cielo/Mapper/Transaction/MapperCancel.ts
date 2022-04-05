import { plainToInstance } from 'class-transformer';
import { Refund } from '../../../../../3-Domain/Entity/Transaction/Refund.js';
import { ResponseAPICieloToReversal } from '../../Response/ReversalCieloTransactionResponse.js';

export abstract class MapperCancel {
    static toCancelTransaction(Json: any, numberRequest: string): Refund {
        let object = plainToInstance(ResponseAPICieloToReversal, Json);

        let cancelTransaction = new Refund();
        cancelTransaction.numberRequest = numberRequest;
        cancelTransaction.nsu = object.ProofOfSale;
        cancelTransaction.tid = object.Tid;
        cancelTransaction.authorizationCode = object.AuthorizationCode;
        cancelTransaction.date = new Date();

        cancelTransaction.isvalid();
        return cancelTransaction;
    }
}
