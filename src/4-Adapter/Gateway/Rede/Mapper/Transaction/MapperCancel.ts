import { plainToInstance } from 'class-transformer';
import { CancelTransaction } from '../../../../../3-Domain/Entity/Transaction/CancelTransaction.js';
import { CancelTransactionResponse } from '../../Response/CancelTransactionResponse.js';

export abstract class MapperCancel {
    static toCancelTransaction(Json: any, numberRequest: string): CancelTransaction {
        let object = plainToInstance(CancelTransactionResponse, Json);

        let transactionCancel = new CancelTransaction();
        transactionCancel.numberRequest = numberRequest;
        transactionCancel.tid = object.tid;
        transactionCancel.nsu = object.nsu;
        transactionCancel.date = object.refundDateTime;
        transactionCancel.authorizationCode = object.refundId;

        transactionCancel.isvalid();
        return transactionCancel;
    }
}
