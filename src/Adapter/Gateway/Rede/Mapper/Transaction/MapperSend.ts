import { plainToInstance } from 'class-transformer';
import { StatusTransaction } from '../../../../../Shared/Enum/StatusTransaction';
import { TypeTransaction } from '../../../../../Shared/Enum/TypeTransaction.enum';
import { TransactionOrder } from '../../../../../Domain/Entity/Transaction/ValueObject/TransactionOrder';
import { SendTransitionResponse } from '../../Response/SendTransitionResponse';

export abstract class MapperSend {
    static toTransaction(Json: any, typeTransaction: TypeTransaction): TransactionOrder {
        let object = plainToInstance(SendTransitionResponse, Json);

        const tid = object.brandTid;
        const numberRequest = object.reference;
        const authorizationCode = object.authorizationCode;
        const nsu = object.nsu;
        const message = object.returnMessage;
        const amount = object.amount;
        const installments = object.installments;

        return TransactionOrder.create(
            numberRequest,
            tid,
            typeTransaction,
            StatusTransaction.NO_CAPTURE,
            amount,
            installments,
            message,
            nsu,
            authorizationCode,
        );
    }
}
