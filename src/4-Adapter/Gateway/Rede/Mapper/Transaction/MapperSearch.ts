import { plainToInstance } from 'class-transformer';
import { CaptureOrder } from '../../../../../3-Domain/Entity/Transaction/CaptureOrder.js';
import { Refund } from '../../../../../3-Domain/Entity/Transaction/Refund.js';
import { Transaction } from '../../../../../3-Domain/Entity/Transaction/Transaction.js';
import { TransactionComplete } from '../../../../../3-Domain/Entity/Transaction/TransactionComplete.js';
import { StatusTransaction } from '../../../../../5-Shared/Enum/StatusTransaction.js';
import { TypeTransaction } from '../../../../../5-Shared/Enum/TypeTransaction.enum.js';
import { SearchTransactionResponse } from '../../Response/SearchTransactionResponse.js';

export abstract class MapperSearch {
    static toTransactionComplete(Json: any): TransactionComplete {
        let object = plainToInstance(SearchTransactionResponse, Json);

        let transactionSearchResponse = new TransactionComplete();
        transactionSearchResponse.transaction = new Transaction();
        transactionSearchResponse.transaction.tid = object.authorization.tid;
        transactionSearchResponse.transaction.amount = object.authorization.amount;
        transactionSearchResponse.transaction.installments = object.authorization.installments;
        transactionSearchResponse.transaction.message = object.authorization.returnMessage;

        if (object.authorization.kind === 'Credit') {
            transactionSearchResponse.transaction.kind = TypeTransaction.CREDIT;
        } else if (object.authorization.kind === 'Debit') {
            transactionSearchResponse.transaction.kind = TypeTransaction.DEBIT;
        }
        transactionSearchResponse.transaction.numberRequest = object.authorization.reference;
        transactionSearchResponse.transaction.authorizationCode = object.authorization.authorizationCode;
        transactionSearchResponse.transaction.nsu = object.authorization.nsu;
        transactionSearchResponse.transaction.status = StatusTransaction.NO_CAPTURE;

        transactionSearchResponse.card.number = object.authorization.cardBin + object.authorization.last4;
        transactionSearchResponse.card.name = '';

        if (object.capture.amount > 0) {
            transactionSearchResponse.capture = new CaptureOrder();
            transactionSearchResponse.capture.amount = object.capture.amount;
            transactionSearchResponse.capture.date = object.capture.dateTime;
            transactionSearchResponse.capture.nsu = object.capture.nsu;
            transactionSearchResponse.capture.numberRequest = object.authorization.reference;
            transactionSearchResponse.transaction.status = StatusTransaction.CAPTURE;
        }

        if (object.refunds.amount > 0) {
            transactionSearchResponse.refund = new Refund();
            transactionSearchResponse.refund.amount = object.refunds.amount;
            transactionSearchResponse.refund.date = object.refunds.dateTime;
            transactionSearchResponse.refund.id = object.refunds.refundId;
            transactionSearchResponse.transaction.status = StatusTransaction.CANCEL;
        }

        transactionSearchResponse.isValid();
        return transactionSearchResponse;
    }
}
