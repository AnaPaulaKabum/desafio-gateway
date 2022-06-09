import { plainToInstance } from 'class-transformer';
import { TypeTransaction } from '../../../../../Domain/Shared/Enum/TypeTransaction.enum';
import { SendCreditCieloTransitionResponse } from '../../Response/SendCreditCieloTransitionResponse';
import { SendDebitTransitionResponse } from '../../Response/SendDebitTransitionResponse';
import { TransactionOrderDTOType } from '../../../../../Domain/Shared/DTO/Order/TransactionOrderDTOType';
import { StatusTransaction } from '../../../../../Domain/Shared/Enum/StatusTransaction';

export class MapperSend {
    private constructor() {}

    public static toTransaction(JsonAPI: any, typeTransaction: TypeTransaction): TransactionOrderDTOType {
        if (typeTransaction === TypeTransaction.CREDIT) {
            return MapperSend.transactionCredit(JsonAPI);
        }

        return MapperSend.transactionDebit(JsonAPI);
    }

    private static transactionCredit(Json: any): TransactionOrderDTOType {
        let object = plainToInstance(SendCreditCieloTransitionResponse, Json);

        return {
            numberRequest: object.Payment.PaymentId,
            tid: object.Payment.Tid,
            authorizationCode: object.Payment.AuthorizationCode,
            nsu: object.Payment.ProofOfSale,
            amount: object.Payment.Amount,
            installments: object.Payment.Installments,
            message: object.Payment.ReturnMessage,
            kind: TypeTransaction.CREDIT,
            status: StatusTransaction.NO_CAPTURE,
        };
    }

    private static transactionDebit(Json: any): TransactionOrderDTOType {
        let object = plainToInstance(SendDebitTransitionResponse, Json);

        return {
            numberRequest: object.Payment.PaymentId,
            tid: object.Payment.Tid,
            message: object.Payment.ReturnMessage,
            amount: object.Payment.Amount,
            kind: TypeTransaction.DEBIT,
            status: StatusTransaction.NO_CAPTURE,
        };
    }
}
