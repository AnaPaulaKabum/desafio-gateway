import { plainToInstance } from 'class-transformer';
import { CancelTransaction } from '../../../../../3-Domain/Entity/Transaction/CancelTransaction.js';
import { ResponseAPICieloToReversal } from '../../Response/ReversalCieloTransactionResponse.js';

export abstract class ResponseAPICancelToTransaction {
    static converte(Json: any): CancelTransaction {
        let object = plainToInstance(ResponseAPICieloToReversal, Json);

        let cancelTransaction = new CancelTransaction();
        cancelTransaction.nsu = object.ProofOfSale;
        /*cancelTransaction.tid = object.Tid;
        cancelTransaction.cancelId = object.AuthorizationCode;
        cancelTransaction.cancelDateTime = new Date();*/

        cancelTransaction.isvalid();
        return cancelTransaction;
    }
}
