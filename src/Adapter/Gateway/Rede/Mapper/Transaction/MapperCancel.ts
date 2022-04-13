import { plainToInstance } from 'class-transformer';
import { RefundOrder } from '../../../../../Domain/Entity/Transaction/ValueObject/RefundOrder';
import { CancelTransactionResponse } from '../../Response/CancelTransactionResponse';

export abstract class MapperCancel {
    static toCancelTransaction(Json: any, numberRequest: string): RefundOrder {
        let object = plainToInstance(CancelTransactionResponse, Json);

        const tid = object.tid;
        const nsu = object.nsu;
        const date = object.refundDateTime;
        const authorizationCode = object.refundId;

        return RefundOrder.create(numberRequest, date, '', 0, tid, nsu, authorizationCode);
    }
}
