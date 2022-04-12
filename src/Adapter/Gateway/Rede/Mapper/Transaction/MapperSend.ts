import { plainToInstance } from 'class-transformer';
import { StatusTransaction } from '../../../../../Shared/Enum/StatusTransaction';
import { TypeTransaction } from '../../../../../Shared/Enum/TypeTransaction.enum';
import { TransactionOrder } from '../../../../../Domain/Entity/Transaction/TransactionOrder';
import { SendTransitionResponse } from '../../Response/SendTransitionResponse';

export abstract class MapperSend {
    static toTransaction(Json: any, typeTransaction: TypeTransaction): TransactionOrder {
        let object = plainToInstance(SendTransitionResponse, Json);

        let transaction = new TransactionOrder();

        transaction.tid = object.brandTid;
        transaction.numberRequest = object.reference;
        transaction.authorizationCode = object.authorizationCode;
        transaction.nsu = object.nsu;
        transaction.message = object.returnMessage;
        transaction.amount = object.amount;
        transaction.installments = object.installments;

        transaction.kind = typeTransaction;
        transaction.status = StatusTransaction.NO_CAPTURE;
        transaction.isValid();
        return transaction;
    }
}
