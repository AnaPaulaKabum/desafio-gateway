import { plainToInstance } from 'class-transformer';
import { RefundOrder } from '../../../../../Domain/Entity/Transaction/ValueObject/RefundOrder';
import { ResponseAPICieloToReversal } from '../../Response/ReversalCieloTransactionResponse';

export abstract class MapperCancel {
    static toCancelTransaction(Json: any, numberRequest: string): RefundOrder {
        let object = plainToInstance(ResponseAPICieloToReversal, Json);

        const nsu = object.ProofOfSale;
        const tid = object.Tid;
        const authorizationCode = object.AuthorizationCode;
        const date = new Date();

        return RefundOrder.create(numberRequest, date, '', 0, tid, nsu, authorizationCode);
    }
}
