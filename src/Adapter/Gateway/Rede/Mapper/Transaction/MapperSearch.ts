import { plainToInstance } from 'class-transformer';
import { CaptureOrder } from '../../../../../Domain/Entity/Transaction/CaptureOrder';
import { RefundOrder } from '../../../../../Domain/Entity/Transaction/RefundOrder';
import { TransactionOrder } from '../../../../../Domain/Entity/Transaction/ValueObject/TransactionOrder';
import { SearchTransactionOrder } from '../../../../../Domain/Entity/Transaction/SearchTransactionOrder';
import { StatusTransaction } from '../../../../../Shared/Enum/StatusTransaction';
import { TypeTransaction } from '../../../../../Shared/Enum/TypeTransaction.enum';
import { SearchTransactionResponse } from '../../Response/SearchTransactionResponse';

export abstract class MapperSearch {
    static toTransactionComplete(Json: any): SearchTransactionOrder {
        let object = plainToInstance(SearchTransactionResponse, Json);

        let transactionSearchResponse = new SearchTransactionOrder();
        /* transactionSearchResponse.transaction = new TransactionOrder();
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

        /*transactionSearchResponse.card.number = object.authorization.cardBin + object.authorization.last4;
        transactionSearchResponse.card.name = '';*/

        if (object.capture.amount > 0) {
            transactionSearchResponse.capture = new CaptureOrder();
            transactionSearchResponse.capture.amount = object.capture.amount;
            transactionSearchResponse.capture.date = object.capture.dateTime;
            transactionSearchResponse.capture.nsu = object.capture.nsu;
            transactionSearchResponse.capture.numberRequest = object.authorization.reference;
            //transactionSearchResponse.transaction.status = StatusTransaction.CAPTURE;
        }

        if (object.refunds.amount > 0) {
            transactionSearchResponse.refund = new RefundOrder();
            transactionSearchResponse.refund.amount = object.refunds.amount;
            transactionSearchResponse.refund.date = object.refunds.dateTime;
            transactionSearchResponse.refund.id = object.refunds.refundId;
            // transactionSearchResponse.transaction.status = StatusTransaction.CANCEL;
        }

        transactionSearchResponse.isValid();
        return transactionSearchResponse;
    }
}
