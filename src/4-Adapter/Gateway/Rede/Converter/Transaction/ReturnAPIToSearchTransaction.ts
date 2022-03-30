import { plainToInstance } from 'class-transformer';
import { Transaction } from '../../../../../3-Domain/Entity/Transaction/Transaction.js';
import { TransactionComplete } from '../../../../../3-Domain/Entity/Transaction/TransactionComplete.js';
import { SearchTransactionResponse } from '../../Response/SearchTransactionResponse.js';

export abstract class ReturnAPIToSearchTransaction {
    static converte(Json: any): TransactionComplete {
        let object = plainToInstance(SearchTransactionResponse, Json);

        let transactionSearchResponse = new TransactionComplete();
        transactionSearchResponse.transaction = new Transaction();
        transactionSearchResponse.transaction.tid = object.authorization.tid;
        transactionSearchResponse.transaction.numberRequest = object.authorization.reference;
        transactionSearchResponse.transaction.authorizationCode = object.authorization.authorizationCode;
        transactionSearchResponse.transaction.nsu = object.capture.nsu;

        return transactionSearchResponse;
    }
}
