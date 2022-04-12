import { plainToInstance } from 'class-transformer';
import { RefundOrder } from '../../../../../3-Domain/Entity/Transaction/RefundOrder';
import { ResponseAPICieloToReversal } from '../../Response/ReversalCieloTransactionResponse';

export abstract class MapperCancel {
    static toCancelTransaction(Json: any, numberRequest: string): RefundOrder {
        let object = plainToInstance(ResponseAPICieloToReversal, Json);

        let cancelTransaction = new RefundOrder();
        cancelTransaction.numberRequest = numberRequest;
        cancelTransaction.nsu = object.ProofOfSale;
        cancelTransaction.tid = object.Tid;
        cancelTransaction.authorizationCode = object.AuthorizationCode;
        cancelTransaction.date = new Date();

        cancelTransaction.isvalid();
        return cancelTransaction;
    }
}
