import { plainToInstance } from 'class-transformer';
import { CancelTransaction } from '../../../../../3-Domain/Entity/Transaction/CancelTransaction.js';
import { ResponseAPICieloToReversal } from '../../Response/ReversalCieloTransactionResponse.js';

export abstract class MapperCancel {
    static toCancelTransaction(Json: any, numberRequest: string): CancelTransaction {
        let object = plainToInstance(ResponseAPICieloToReversal, Json);

        let cancelTransaction = new CancelTransaction();
        cancelTransaction.numberRequest = numberRequest;
        cancelTransaction.nsu = object.ProofOfSale;
        cancelTransaction.tid = object.Tid;
        cancelTransaction.authorizationCode = object.AuthorizationCode;
        cancelTransaction.date = new Date();

        cancelTransaction.isvalid();
        return cancelTransaction;
    }
}
