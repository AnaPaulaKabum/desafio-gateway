import { plainToInstance } from 'class-transformer';
import { CancelOrder } from '../../../../../Domain/Entity/Transaction/ValueObject/CancelOrder';
import { CancelTransactionResponse } from '../../Response/CancelTransactionResponse';

export abstract class MapperCancel {
    static toCancelTransaction(Json: any, numberRequest: string): CancelOrder {
        let object = plainToInstance(CancelTransactionResponse, Json);

        const tid = object.tid;
        const nsu = object.nsu;
        const date = object.refundDateTime;
        const authorizationCode = object.refundId;

        return CancelOrder.create(numberRequest, date, '', 0, tid, nsu, authorizationCode);
    }
}
