import { plainToInstance } from 'class-transformer';
import { Transaction } from '../../../../../3-Domain/Entity/Transaction/Transaction.js';
import { Capture, Card, TransactionComplete } from '../../../../../3-Domain/Entity/Transaction/TransactionComplete.js';
import { StatusTransaction } from '../../../../../5-Shared/Enum/StatusTransaction.js';
import { TypeTransaction } from '../../../../../5-Shared/Enum/TypeTransaction.enum.js';
import { SearchTransactionResponse } from '../../Response/SearchTransactionResponse.js';

export abstract class ReturnAPIToSearchTransaction {
    static converte(Json: any): TransactionComplete {
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
        transactionSearchResponse.capture = new Capture();
        transactionSearchResponse.capture.amount = object.capture.amount;
        transactionSearchResponse.capture.date = object.capture.dateTime;

        transactionSearchResponse.transaction.status = StatusTransaction.NO_CAPTURE;
        if (!object.capture.dateTime) {
            transactionSearchResponse.transaction.status = StatusTransaction.FINNALY;
        }

        transactionSearchResponse.card = new Card();
        transactionSearchResponse.card.cardNumber = object.authorization.cardBin + object.authorization.last4;
        transactionSearchResponse.card.name = '';

        transactionSearchResponse.isValid();
        return transactionSearchResponse;
    }
}
