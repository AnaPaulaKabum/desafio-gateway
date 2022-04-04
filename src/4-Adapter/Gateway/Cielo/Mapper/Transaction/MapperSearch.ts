import { plainToInstance } from 'class-transformer';
import { Transaction } from '../../../../../3-Domain/Entity/Transaction/Transaction.js';
import { SearchCieloTransactionResponse } from '../../Response/SearchCieloTransactionResponse.js';
import { TransactionComplete } from '../../../../../3-Domain/Entity/Transaction/TransactionComplete.js';
import { Capture } from '../../../../../3-Domain/Entity/Transaction/Capture.js';
import { StatusTransaction } from '../../../../../5-Shared/Enum/StatusTransaction.js';
import { Refund } from '../../../../../3-Domain/Entity/Transaction/Refund.js';
import { TypeTransaction } from '../../../../../5-Shared/Enum/TypeTransaction.enum.js';

export abstract class MapperSearch {
    static toTransactionComplete(Json: any): TransactionComplete {
        let object = plainToInstance(SearchCieloTransactionResponse, Json);

        let transactionSearchResponse = new TransactionComplete();
        transactionSearchResponse.transaction = new Transaction();
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
        transactionSearchResponse.transaction.status = StatusTransaction.NO_CAPTURE;

        transactionSearchResponse.card.number = object.Payment.CreditCard.CardNumber;
        transactionSearchResponse.card.brand = object.Payment.CreditCard.Brand;
        transactionSearchResponse.card.name = object.Payment.CreditCard.Holder;

        if (object.Payment.CapturedAmount > 0) {
            transactionSearchResponse.capture = new Capture();
            transactionSearchResponse.capture.amount = object.Payment.CapturedAmount;
            transactionSearchResponse.capture.date = object.Payment.CapturedDate;
            transactionSearchResponse.capture.numberRequest = object.MerchantOrderId;
            transactionSearchResponse.capture.nsu = '';
            transactionSearchResponse.transaction.status = StatusTransaction.CAPTURE;
        }

        if (object.Payment.VoidedAmount > 0) {
            transactionSearchResponse.refund = new Refund();
            transactionSearchResponse.refund.id = '';
            transactionSearchResponse.refund.amount = object.Payment.VoidedAmount;
            transactionSearchResponse.refund.date = object.Payment.VoidedDate;
            transactionSearchResponse.transaction.status = StatusTransaction.CANCEL;
        }

        transactionSearchResponse.isValid();
        return transactionSearchResponse;
    }
}
