import { plainToInstance } from 'class-transformer';
import { StatusTransaction } from '../../../../../Shared/Enum/StatusTransaction';
import { TypeTransaction } from '../../../../../Shared/Enum/TypeTransaction.enum';
import { TransactionOrder } from '../../../../../Domain/Entity/Transaction/TransactionOrder';
import { SendCreditCieloTransitionResponse } from '../../Response/SendCreditCieloTransitionResponse';
import { SendDebitTransitionResponse } from '../../Response/SendDebitTransitionResponse';

export class MapperSend {
    private constructor() {}

    public static toTransaction(JsonAPI: any, typeTransaction: TypeTransaction): TransactionOrder {
        if (typeTransaction === TypeTransaction.CREDIT) {
            return MapperSend.transactionCredit(JsonAPI);
        }

        return MapperSend.transactionDebit(JsonAPI);
    }

    private static transactionCredit(Json: any) {
        let object = plainToInstance(SendCreditCieloTransitionResponse, Json);

        const numberRequest = object.Payment.PaymentId;
        const tid = object.Payment.Tid;
        const authorizationCode = object.Payment.AuthorizationCode;
        const nsu = object.Payment.ProofOfSale;
        const amount = object.Payment.Amount;
        const installments = object.Payment.Installments;
        const message = object.Payment.ReturnMessage;

        return TransactionOrder.create(
            numberRequest,
            tid,
            TypeTransaction.CREDIT,
            StatusTransaction.NO_CAPTURE,
            amount,
            message,
            nsu,
            authorizationCode,
            installments,
        );
    }

    private static transactionDebit(Json: any) {
        let object = plainToInstance(SendDebitTransitionResponse, Json);

        const numberRequest = object.Payment.PaymentId;
        const tid = object.Payment.Tid;
        const message = object.Payment.ReturnMessage;
        const amount = object.Payment.Amount;

        return TransactionOrder.create(
            numberRequest,
            tid,
            TypeTransaction.DEBIT,
            StatusTransaction.NO_CAPTURE,
            amount,
            message,
        );
    }
}
