import { plainToInstance } from 'class-transformer';
import { SearchCieloTransactionResponse } from '../../Response/SearchCieloTransactionResponse';
import { StatusTransaction } from '../../../../../Shared/Enum/StatusTransaction';
import { TypeTransaction } from '../../../../../Shared/Enum/TypeTransaction.enum';
import { SearchTransactionOrderDTO } from '../../../../../Shared/DTO/Order/SearchTransactionOrder';
import { TransactionOrderDTO } from '../../../../../Shared/DTO/Order/TransactionOrderDTO';

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
        /*
        let refund;
        if (object.Payment.VoidedAmount > 0) {
            const amountCancel = object.Payment.VoidedAmount;
            const dateCancel = object.Payment.VoidedDate;
            refund = CancelOrder.create(numberRequest, dateCancel, amountCancel, '123', '123', '123');
            status = StatusTransaction.CANCEL;
        }*/

        searchTransactionDTO.transaction = MapperSearch.createTransactionOrderDTO(object);
        searchTransactionDTO.creditCard = object.Payment.CreditCard.CardNumber;
        return searchTransactionDTO;
    }

    private static createTransactionOrderDTO(object: SearchCieloTransactionResponse): TransactionOrderDTO {
        const transactionOrderDTO = new TransactionOrderDTO();

        if (object.Payment.Type === 'CreditCard') transactionOrderDTO.kind = TypeTransaction.CREDIT;
        else transactionOrderDTO.kind = TypeTransaction.DEBIT;
        transactionOrderDTO.numberRequest = object.MerchantOrderId;
        transactionOrderDTO.installments = object.Payment.Installments;
        transactionOrderDTO.tid = object.Payment.Tid;
        transactionOrderDTO.authorizationCode = object.Payment.AuthorizationCode;
        transactionOrderDTO.nsu = object.Payment.ProofOfSale;
        transactionOrderDTO.amount = object.Payment.Amount;
        transactionOrderDTO.status = StatusTransaction.NO_CAPTURE;
        transactionOrderDTO.message = 'Transaction Cielo';

        return transactionOrderDTO;
    }
}
