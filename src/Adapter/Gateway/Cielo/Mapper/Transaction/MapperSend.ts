import { plainToInstance } from 'class-transformer';
import { StatusTransaction } from '../../../../../Shared/Enum/StatusTransaction';
import { TypeTransaction } from '../../../../../Shared/Enum/TypeTransaction.enum';
import { TransactionOrder } from '../../../../../Domain/Entity/Transaction/ValueObject/TransactionOrder';
import { SendCreditCieloTransitionResponse } from '../../Response/SendCreditCieloTransitionResponse';
import { SendDebitTransitionResponse } from '../../Response/SendDebitTransitionResponse';
import { json } from 'stream/consumers';

export class MapperSend {
    public static toTransaction(Json: any, typeTransaction: TypeTransaction): TransactionOrder {
        if (typeTransaction === TypeTransaction.CREDIT) {
            return MapperSend.transactionCredit(json);
        }

        return MapperSend.transactionDebit(json);
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
            authorizationCode,
            nsu,
            StatusTransaction.NO_CAPTURE,
            amount,
            installments,
            message,
        );
    }

    private static transactionDebit(Json: any) {
        let object = plainToInstance(SendDebitTransitionResponse, Json);
        const numberRequest = object.Payment.PaymentId;
        const tid = object.Payment.Tid;
        const authorizationCode = '';
        const nsu = '';
        const message = object.Payment.ReturnMessage;
        const amount = object.Payment.Amount;
        const installments = object.Payment.Installments;

        return TransactionOrder.create(
            numberRequest,
            tid,
            TypeTransaction.DEBIT,
            authorizationCode,
            nsu,
            StatusTransaction.NO_CAPTURE,
            amount,
            installments,
            message,
        );
    }
}
