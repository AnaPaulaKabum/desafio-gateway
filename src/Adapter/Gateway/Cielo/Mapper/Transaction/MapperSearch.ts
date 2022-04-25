import { plainToInstance } from 'class-transformer';
import { TransactionOrder } from '../../../../../Domain/Entity/Transaction/TransactionOrder';
import { SearchCieloTransactionResponse } from '../../Response/SearchCieloTransactionResponse';
import { SearchTransactionOrder } from '../../../../../Domain/Entity/Transaction/SearchTransactionOrder';
import { CaptureOrder } from '../../../../../Domain/Entity/Transaction/CaptureOrder';
import { StatusTransaction } from '../../../../../Shared/Enum/StatusTransaction';
import { CancelOrder } from '../../../../../Domain/Entity/Transaction/CancelOrder';
import { TypeTransaction } from '../../../../../Shared/Enum/TypeTransaction.enum';
import { SearchTransactionOrderDTO } from '../../../../../Shared/DTO/Order/SearchTransactionOrder';

export class MapperSearch {
    private constructor() {}

    static toTransactionComplete(Json: any): SearchTransactionOrderDTO {
        throw new Error('Implementar;');

        /*let object = plainToInstance(SearchCieloTransactionResponse, Json);

        const numberRequest = object.MerchantOrderId;

        let status = StatusTransaction.NO_CAPTURE;

        let capture;
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
        }
        let kind;
        if (object.Payment.Type === 'CreditCard') {
            kind = TypeTransaction.CREDIT;
        } else {
            kind = TypeTransaction.DEBIT;
        }

        const installments = object.Payment.Installments;
        const message = 'xxx';
        const tid = object.Payment.Tid;
        const authorizationCodePayment = object.Payment.AuthorizationCode;
        const nsu = object.Payment.ProofOfSale;
        const amount = object.Payment.Amount;

        const transaction = TransactionOrder.create(
            numberRequest,
            tid,
            kind,
            status,
            amount,
            message,
            nsu,
            authorizationCodePayment,
            installments,
        );

        let transactionSearchResponse = new SearchTransactionOrder(transaction);
        transactionSearchResponse.creditCard = object.Payment.CreditCard.CardNumber;
        transactionSearchResponse.cancel = refund;
        transactionSearchResponse.capture = capture;
        return transactionSearchResponse;*/
    }
}
