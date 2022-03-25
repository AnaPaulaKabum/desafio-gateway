import { plainToInstance } from 'class-transformer';
import { CancelTransaction } from '../../../../../3-Domain/Entity/CancelTransaction.js';
import { CancelTransactionResponse } from '../../Response/CancelTransactionResponse.js';

export abstract class RetrunAPIToCancelTransaction {
    static converte(Json: any): CancelTransaction {
        let object = plainToInstance(CancelTransactionResponse, Json);

        let transactionCancelResponse = new CancelTransaction();

        transactionCancelResponse.tid = object.tid;
        transactionCancelResponse.nsu = object.nsu;
        transactionCancelResponse.cancelId = object.cancelId;
        transactionCancelResponse.cancelDateTime = object.refundDateTime;

        return transactionCancelResponse;
    }
}
