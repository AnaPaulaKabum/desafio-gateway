import { plainToInstance } from 'class-transformer';
import { CancelOrder } from '../../../../../Domain/Entity/Transaction/ValueObject/CancelOrder';
import { TransactionOrder } from '../../../../../Domain/Entity/Transaction/ValueObject/TransactionOrder';
import { CancelTransactionResponse } from '../../Response/CancelTransactionResponse';

export class MapperCancel {
    private constructor() {}

    static toCancelTransaction(Json: any, transaction: TransactionOrder): CancelOrder {
        let object = plainToInstance(CancelTransactionResponse, Json);

        const tid = object.tid;
        const nsu = object.nsu;
        const date = object.refundDateTime;
        const authorizationCode = object.refundId;

        return CancelOrder.create(transaction.numberRequest, date, transaction.amount, tid, nsu, authorizationCode);
    }
}
