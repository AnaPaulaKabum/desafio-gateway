import { plainToInstance } from 'class-transformer';
import { SearchCieloTransactionResponse } from '../../Response/SearchCieloTransactionResponse';
import { StatusTransaction } from '../../../../../Shared/Enum/StatusTransaction';
import { SearchTransactionOrderDTO } from '../../../../../Shared/DTO/Order/SearchTransactionOrder';
import { TransactionOrderDTOType } from '../../../../../Shared/DTO/Order/TransactionOrderDTOType';
import { TypeTransaction } from '../../../../../Shared/Enum/TypeTransaction.enum';

export class MapperSearch {
    private constructor() {}

    static toTransactionComplete(Json: any): SearchTransactionOrderDTO {
        let object = plainToInstance(SearchCieloTransactionResponse, Json);

        let status = StatusTransaction.NO_CAPTURE;
        const searchTransactionDTO = new SearchTransactionOrderDTO();

        if (object.Payment.CapturedAmount > 0) {
            searchTransactionDTO.captureAmount = object.Payment.CapturedAmount;
            searchTransactionDTO.captureDate = object.Payment.CapturedDate;
            status = StatusTransaction.CAPTURE;
        }

        if (object.Payment.VoidedAmount > 0) {
            searchTransactionDTO.cancelAmount = object.Payment.VoidedAmount;
            searchTransactionDTO.cancelDate = object.Payment.VoidedDate;
            status = StatusTransaction.CANCEL;
        }

        searchTransactionDTO.transaction = MapperSearch.createTransactionOrderDTO(object);
        searchTransactionDTO.numberCreditCard = object.Payment.CreditCard.CardNumber;
        return searchTransactionDTO;
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
