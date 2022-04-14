import { plainToInstance } from 'class-transformer';
import { CancelOrder } from '../../../../../Domain/Entity/Transaction/ValueObject/CancelOrder';
import { ResponseAPICieloToReversal } from '../../Response/ReversalCieloTransactionResponse';

export abstract class MapperCancel {
    static toCancelTransaction(Json: any, numberRequest: string): CancelOrder {
        let object = plainToInstance(ResponseAPICieloToReversal, Json);

        const nsu = object.ProofOfSale;
        const tid = object.Tid;
        const authorizationCode = object.AuthorizationCode;
        const date = new Date();

        return CancelOrder.create(numberRequest, date, '', 0, tid, nsu, authorizationCode);
    }
}
