import { plainToInstance } from 'class-transformer';
import { Transaction } from '../../../../../3-Domain/Entity/Transaction/Transaction.js';
import { SearchCieloTransactionResponse } from '../../Response/SearchCieloTransactionResponse.js';
import { TransactionComplete } from '../../../../../3-Domain/Entity/Transaction/TransactionComplete.js';

export abstract class ResponseAPIToSearchTransaction {
    static converte(Json: any): TransactionComplete {
        let object = plainToInstance(SearchCieloTransactionResponse, Json);

        let transactionSearchResponse = new TransactionComplete();

        /*transactionSearchResponse.tid = object.authorization.tid;
        transactionSearchResponse.numberRequest = object.authorization.reference;
        transactionSearchResponse.authorizationCode = object.authorization.authorizationCode;
        transactionSearchResponse.nsu = object.capture.nsu;*/

        return transactionSearchResponse;
    }
}
