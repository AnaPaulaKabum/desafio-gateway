import { plainToInstance } from 'class-transformer';
import { TransactionOrder } from '../../../../../Domain/Entity/Transaction/ValueObject/TransactionOrder';
import { SearchCieloTransactionResponse } from '../../Response/SearchCieloTransactionResponse';
import { SearchTransactionOrder } from '../../../../../Domain/Entity/Transaction/SearchTransactionOrder';
import { CaptureOrder } from '../../../../../Domain/Entity/Transaction/ValueObject/CaptureOrder';
import { StatusTransaction } from '../../../../../Shared/Enum/StatusTransaction';
import { RefundOrder } from '../../../../../Domain/Entity/Transaction/ValueObject/RefundOrder';
import { TypeTransaction } from '../../../../../Shared/Enum/TypeTransaction.enum';

export abstract class MapperSearch {
    static toTransactionComplete(Json: any): SearchTransactionOrder {
        let object = plainToInstance(SearchCieloTransactionResponse, Json);

        let transactionSearchResponse = new SearchTransactionOrder();
        /*transactionSearchResponse.transaction = new TransactionOrder();
        transactionSearchResponse.transaction.numberRequest = object.MerchantOrderId;

        if (object.Payment.Type === 'CreditCard') {
            transactionSearchResponse.transaction.kind = TypeTransaction.CREDIT;
        } else {
            transactionSearchResponse.transaction.kind = TypeTransaction.DEBIT;
        }
        transactionSearchResponse.transaction.installments = object.Payment.Installments;
        transactionSearchResponse.transaction.message = '';

        transactionSearchResponse.transaction.tid = object.Payment.Tid;
        transactionSearchResponse.transaction.authorizationCode = object.Payment.AuthorizationCode;
        transactionSearchResponse.transaction.nsu = object.Payment.ProofOfSale;
        transactionSearchResponse.transaction.amount = object.Payment.Amount;
        transactionSearchResponse.transaction.status = StatusTransaction.NO_CAPTURE;*/

        /*transactionSearchResponse.card.number = object.Payment.CreditCard.CardNumber;
        transactionSearchResponse.card.brand = object.Payment.CreditCard.Brand;
        transactionSearchResponse.card.name = object.Payment.CreditCard.Holder;*/

        if (object.Payment.CapturedAmount > 0) {
            /*transactionSearchResponse.capture = new CaptureOrder();
            transactionSearchResponse.capture.amount = object.Payment.CapturedAmount;
            transactionSearchResponse.capture.date = object.Payment.CapturedDate;
            transactionSearchResponse.capture.numberRequest = object.MerchantOrderId;
            transactionSearchResponse.capture.nsu = '';*/
            //  transactionSearchResponse.transaction.status = StatusTransaction.CAPTURE;
        }

        if (object.Payment.VoidedAmount > 0) {
            /* transactionSearchResponse.refund = new RefundOrder();
            transactionSearchResponse.refund.id = '';
            transactionSearchResponse.refund.amount = object.Payment.VoidedAmount;
            transactionSearchResponse.refund.date = object.Payment.VoidedDate;
            //transactionSearchResponse.transaction.status = StatusTransaction.CANCEL;*/
        }

        return transactionSearchResponse;
    }
}
