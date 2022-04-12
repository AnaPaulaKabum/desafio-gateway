import { plainToInstance } from 'class-transformer';
import { StatusTransaction } from '../../../../../Shared/Enum/StatusTransaction';
import { TypeTransaction } from '../../../../../Shared/Enum/TypeTransaction.enum';
import { TransactionOrder } from '../../../../../Domain/Entity/Transaction/TransactionOrder';
import { SendCreditCieloTransitionResponse } from '../../Response/SendCreditCieloTransitionResponse';
import { SendDebitTransitionResponse } from '../../Response/SendDebitTransitionResponse';

export abstract class MapperSend {
    static toTransaction(Json: any, typeTransaction: TypeTransaction): TransactionOrder {
        let transaction = new TransactionOrder();
        if (typeTransaction === TypeTransaction.CREDIT) {
            let object = plainToInstance(SendCreditCieloTransitionResponse, Json);

            transaction.numberRequest = object.Payment.PaymentId;
            transaction.tid = object.Payment.Tid;
            transaction.authorizationCode = object.Payment.AuthorizationCode;
            transaction.nsu = object.Payment.ProofOfSale;
            transaction.message = object.Payment.ReturnMessage;
            transaction.amount = object.Payment.Amount;
            transaction.installments = object.Payment.Installments;
            transaction.status = StatusTransaction.NO_CAPTURE;
        } else {
            let object = plainToInstance(SendDebitTransitionResponse, Json);
            transaction.numberRequest = object.Payment.PaymentId;
            transaction.tid = object.Payment.Tid;
            transaction.message = object.Payment.ReturnMessage;
            transaction.amount = object.Payment.Amount;
            transaction.installments = object.Payment.Installments;
            transaction.status = StatusTransaction.NO_CAPTURE;
            transaction.authorizationCode = '';
            transaction.nsu = '';
        }
        transaction.kind = typeTransaction;
        transaction.isValid();
        return transaction;
    }
}
