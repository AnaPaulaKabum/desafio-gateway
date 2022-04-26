import { plainToInstance } from 'class-transformer';
import { TransactionOrder } from '../../../../../Domain/Entity/Transaction/TransactionOrder';
import { SearchCieloTransactionResponse } from '../../Response/SearchCieloTransactionResponse';
import { SearchTransactionOrder } from '../../../../../Domain/Entity/Transaction/SearchTransactionOrder';
import { CaptureOrder } from '../../../../../Domain/Entity/Transaction/CaptureOrder';
import { StatusTransaction } from '../../../../../Shared/Enum/StatusTransaction';
import { CancelOrder } from '../../../../../Domain/Entity/Transaction/CancelOrder';
import { TypeTransaction } from '../../../../../Shared/Enum/TypeTransaction.enum';
import { SearchTransactionOrderDTO } from '../../../../../Shared/DTO/Order/SearchTransactionOrder';
import { TransactionOrderDTO } from '../../../../../Shared/DTO/Order/TransactionOrderDTO';

export class MapperSearch {
    private constructor() {}

    static toTransactionComplete(Json: any): SearchTransactionOrderDTO {
        let object = plainToInstance(SearchCieloTransactionResponse, Json);

        let status = StatusTransaction.NO_CAPTURE;

        /*let capture;
        if (object.Payment.CapturedAmount > 0) {
            const amountCapture = object.Payment.CapturedAmount;
            const dateCapture = object.Payment.CapturedDate;
            const nsuCapture = '123';
            const authorizationCode = '123';
            capture = CaptureOrder.create(numberRequest, amountCapture, dateCapture, nsuCapture, authorizationCode);
            status = StatusTransaction.CAPTURE;
        }
        
        let refund;
        if (object.Payment.VoidedAmount > 0) {
            const amountCancel = object.Payment.VoidedAmount;
            const dateCancel = object.Payment.VoidedDate;
            refund = CancelOrder.create(numberRequest, dateCancel, amountCancel, '123', '123', '123');
            status = StatusTransaction.CANCEL;
        }*/

        const transactionOrderDTO = new TransactionOrderDTO();

        if (object.Payment.Type === 'CreditCard') {
            transactionOrderDTO.kind = TypeTransaction.CREDIT;
        } else {
            transactionOrderDTO.kind = TypeTransaction.DEBIT;
        }

        transactionOrderDTO.numberRequest = object.MerchantOrderId;
        transactionOrderDTO.installments = object.Payment.Installments;
        transactionOrderDTO.tid = object.Payment.Tid;
        transactionOrderDTO.authorizationCode = object.Payment.AuthorizationCode;
        transactionOrderDTO.nsu = object.Payment.ProofOfSale;
        transactionOrderDTO.amount = object.Payment.Amount;
        transactionOrderDTO.status = status;
        transactionOrderDTO.message = 'Transaction Cielo';

        const searchTransactionDTO = new SearchTransactionOrderDTO();
        searchTransactionDTO.transaction = transactionOrderDTO;
        searchTransactionDTO.creditCard = object.Payment.CreditCard.CardNumber;
        //transactionSearchResponse.cancel = refund;
        //transactionSearchResponse.capture = capture;
        return searchTransactionDTO;
    }
}
