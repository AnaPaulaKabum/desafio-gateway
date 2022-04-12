import { plainToInstance } from 'class-transformer';
import { CaptureOrder } from '../../../../../Domain/Entity/Transaction/CaptureOrder';
import { RefundOrder } from '../../../../../Domain/Entity/Transaction/RefundOrder';
import { TransactionOrder } from '../../../../../Domain/Entity/Transaction/ValueObject/TransactionOrder';
import { SearchTransactionOrder } from '../../../../../Domain/Entity/Transaction/SearchTransactionOrder';
import { StatusTransaction } from '../../../../../Shared/Enum/StatusTransaction';
import { TypeTransaction } from '../../../../../Shared/Enum/TypeTransaction.enum';
import { SearchTransactionResponse } from '../../Response/SearchTransactionResponse';
import { Card } from '../../../../../Domain/Entity/Transaction/ValueObject/Card';

export abstract class MapperSearch {
    static toTransactionComplete(Json: any): SearchTransactionOrder {
        let object = plainToInstance(SearchTransactionResponse, Json);

        let transactionSearchResponse = new SearchTransactionOrder();

        const tid = object.authorization.tid;
        const amount = object.authorization.amount;
        const installments = object.authorization.installments;
        const message = object.authorization.returnMessage;
        const numberRequest = object.authorization.reference;
        const authorizationCode = object.authorization.authorizationCode;
        const nsu = object.authorization.nsu;
        let status = StatusTransaction.NO_CAPTURE;

        let kind;
        if (object.authorization.kind === 'Credit') {
            kind = TypeTransaction.CREDIT;
        } else if (object.authorization.kind === 'Debit') {
            kind = TypeTransaction.DEBIT;
        }

        transactionSearchResponse.card = Card.create(
            object.authorization.cardBin + object.authorization.last4,
            'XXX',
            1,
            2025,
            '123',
        );

        transactionSearchResponse.transaction = TransactionOrder.create(
            numberRequest,
            tid,
            kind,
            authorizationCode,
            nsu,
            status,
            amount,
            installments,
            message,
        );

        if (object.capture.amount > 0) {
            transactionSearchResponse.capture = new CaptureOrder();
            transactionSearchResponse.capture.amount = object.capture.amount;
            transactionSearchResponse.capture.date = object.capture.dateTime;
            transactionSearchResponse.capture.nsu = object.capture.nsu;
            transactionSearchResponse.capture.numberRequest = object.authorization.reference;
            status = StatusTransaction.CAPTURE;
        }

        if (object.refunds.amount > 0) {
            transactionSearchResponse.refund = new RefundOrder();
            transactionSearchResponse.refund.amount = object.refunds.amount;
            transactionSearchResponse.refund.date = object.refunds.dateTime;
            transactionSearchResponse.refund.id = object.refunds.refundId;
            status = StatusTransaction.CANCEL;
        }

        transactionSearchResponse.isValid();
        return transactionSearchResponse;
    }
}
