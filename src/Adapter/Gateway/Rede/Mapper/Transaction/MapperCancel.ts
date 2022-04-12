import { plainToInstance } from 'class-transformer';
import { RefundOrder } from '../../../../../Domain/Entity/Transaction/ValueObject/RefundOrder';
import { CancelTransactionResponse } from '../../Response/CancelTransactionResponse';

export abstract class MapperCancel {
    static toCancelTransaction(Json: any, numberRequest: string): RefundOrder {
        let object = plainToInstance(CancelTransactionResponse, Json);

        /*let transactionCancel = new RefundOrder();
        transactionCancel.numberRequest = numberRequest;
        transactionCancel.tid = object.tid;
        transactionCancel.nsu = object.nsu;
        transactionCancel.date = object.refundDateTime;
        transactionCancel.authorizationCode = object.refundId;

        transactionCancel.isvalid();
        return transactionCancel;*/

        throw new Error('Implementar');
    }
}
