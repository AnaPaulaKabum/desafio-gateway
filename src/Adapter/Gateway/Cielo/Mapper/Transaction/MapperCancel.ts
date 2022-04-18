import { plainToInstance } from 'class-transformer';
import { CancelOrder } from '../../../../../Domain/Entity/Transaction/CancelOrder';
import { TransactionOrder } from '../../../../../Domain/Entity/Transaction/TransactionOrder';
import { ResponseAPICieloToReversal } from '../../Response/ReversalCieloTransactionResponse';

export class MapperCancel {
    private constructor() {}

    static toCancelTransaction(Json: any, transactionOrder: TransactionOrder): CancelOrder {
        let object = plainToInstance(ResponseAPICieloToReversal, Json);

        const nsu = object.ProofOfSale;
        const tid = object.Tid;
        const authorizationCode = object.AuthorizationCode;
        const date = new Date();

        return CancelOrder.create(
            transactionOrder.numberRequest,
            date,
            transactionOrder.amount,
            tid,
            nsu,
            authorizationCode,
        );
    }
}
