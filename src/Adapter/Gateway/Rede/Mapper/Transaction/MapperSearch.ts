import { plainToInstance } from 'class-transformer';
import { CaptureOrder } from '../../../../../Domain/Entity/Transaction/CaptureOrder';
import { CancelOrder } from '../../../../../Domain/Entity/Transaction/CancelOrder';
import { TransactionOrder } from '../../../../../Domain/Entity/Transaction/TransactionOrder';
import { SearchTransactionOrder } from '../../../../../Domain/Entity/Transaction/SearchTransactionOrder';
import { StatusTransaction } from '../../../../../Shared/Enum/StatusTransaction';
import { TypeTransaction } from '../../../../../Shared/Enum/TypeTransaction.enum';
import { SearchTransactionResponse } from '../../Response/SearchTransactionResponse';

export class MapperSearch {
    private constructor() {}

    static toTransactionComplete(Json: any): SearchTransactionOrder {
        let object = plainToInstance(SearchTransactionResponse, Json);

        const transaction = MapperSearch.createTransaction(object);

        let searchTransaction = new SearchTransactionOrder(transaction);
        searchTransaction.creditCard = object.authorization.cardBin + object.authorization.last4;

        if (object.capture.amount > 0) {
            searchTransaction.capture = MapperSearch.createCaptura(object);
        }

        if (object.refunds.amount > 0) {
            searchTransaction.cancel = MapperSearch.createCancel(object, transaction);
        }

        return searchTransaction;
    }

    private static createTransaction(object: SearchTransactionResponse): TransactionOrder {
        let kind;
        if (object.authorization.kind === 'Credit') {
            kind = TypeTransaction.CREDIT;
        } else if (object.authorization.kind === 'Debit') {
            kind = TypeTransaction.DEBIT;
        }
        const tid = object.authorization.tid;
        const amount = object.authorization.amount;
        const installments = object.authorization.installments;
        const message = object.authorization.returnMessage;
        const numberRequest = object.authorization.reference;
        const authorizationCode = object.authorization.authorizationCode;
        const nsu = object.authorization.nsu;
        let status = StatusTransaction.NO_CAPTURE;

        return TransactionOrder.create(
            numberRequest,
            tid,
            kind,
            status,
            amount,
            message,
            nsu,
            authorizationCode,
            installments,
        );
    }

    private static createCaptura(object: SearchTransactionResponse): CaptureOrder {
        const amount = object.capture.amount;
        const date = object.capture.dateTime;
        const nsu = object.capture.nsu;
        const numberRequest = object.authorization.reference;
        const authorizationCode = '';

        return CaptureOrder.create(numberRequest, amount, date, nsu, authorizationCode);
    }

    private static createCancel(object: SearchTransactionResponse, transaction: TransactionOrder): CancelOrder {
        const amount = object.refunds.amount;
        const date = object.refunds.dateTime;

        return CancelOrder.create(transaction.numberRequest, date, amount, 'tid', 'nsu', 'autho');
    }
}
