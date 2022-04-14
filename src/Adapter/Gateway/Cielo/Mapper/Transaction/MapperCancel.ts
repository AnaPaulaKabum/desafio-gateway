import { plainToInstance } from 'class-transformer';
import { CancelOrder } from '../../../../../Domain/Entity/Transaction/ValueObject/CancelOrder';
import { TransactionOrder } from '../../../../../Domain/Entity/Transaction/ValueObject/TransactionOrder';
import { ResponseAPICieloToReversal } from '../../Response/ReversalCieloTransactionResponse';

export abstract class MapperCancel {
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
