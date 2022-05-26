import { plainToInstance } from 'class-transformer';
import { SearchCieloTransactionResponse } from '../../Response/SearchCieloTransactionResponse';
import { StatusTransaction } from '../../../../../Shared/Enum/StatusTransaction';
import { SearchTransactionOrderDTOType } from '../../../../../Shared/DTO/Order/SearchTransactionOrderType';
import { TransactionOrderDTOType } from '../../../../../Shared/DTO/Order/TransactionOrderDTOType';
import { TypeTransaction } from '../../../../../Shared/Enum/TypeTransaction.enum';

export class MapperSearch {
    private constructor() {}

    static toTransactionComplete(Json: any): SearchTransactionOrderDTOType {
        let object = plainToInstance(SearchCieloTransactionResponse, Json);

        let status = StatusTransaction.NO_CAPTURE;

        const transaction = MapperSearch.createTransactionOrderDTO(object);
        const numberCreditCard = object.Payment.CreditCard.CardNumber;

        if (object.Payment.CapturedAmount > 0) {
            const captureAmount = object.Payment.CapturedAmount;
            const captureDate = object.Payment.CapturedDate;
            status = StatusTransaction.CAPTURE;

            return { transaction, numberCreditCard, captureAmount, captureDate };
        }

        if (object.Payment.VoidedAmount > 0) {
            const cancelAmount = object.Payment.VoidedAmount;
            const cancelDate = object.Payment.VoidedDate;
            status = StatusTransaction.CANCEL;
            return { transaction, numberCreditCard, cancelAmount, cancelDate };
        }

        return { transaction, numberCreditCard };
    }

    private static createTransactionOrderDTO(object: SearchCieloTransactionResponse): TransactionOrderDTOType {
        let kind;
        if (object.Payment.Type === 'CreditCard') kind = TypeTransaction.CREDIT;
        else kind = TypeTransaction.DEBIT;

        return {
            numberRequest: object.MerchantOrderId,
            installments: object.Payment.Installments,
            tid: object.Payment.Tid,
            authorizationCode: object.Payment.AuthorizationCode,
            nsu: object.Payment.ProofOfSale,
            amount: object.Payment.Amount,
            status: StatusTransaction.NO_CAPTURE,
            message: 'Transaction Cielo',
            kind: kind,
        };
    }
}
