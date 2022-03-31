import { plainToInstance } from 'class-transformer';
import { Transaction } from '../../../../../3-Domain/Entity/Transaction/Transaction.js';
import { SearchCieloTransactionResponse } from '../../Response/SearchCieloTransactionResponse.js';
import { Card, TransactionComplete } from '../../../../../3-Domain/Entity/Transaction/TransactionComplete.js';
import { Capture } from '../../../../../3-Domain/Entity/Transaction/Capture.js';

export abstract class ResponseAPIToSearchTransaction {
    static converte(Json: any): TransactionComplete {
        let object = plainToInstance(SearchCieloTransactionResponse, Json);

        let transactionSearchResponse = new TransactionComplete();
        transactionSearchResponse.transaction = new Transaction();
        transactionSearchResponse.transaction.numberRequest = object.MerchantOrderId;
        transactionSearchResponse.transaction.tid = object.Payment.Tid;
        transactionSearchResponse.transaction.authorizationCode = object.Payment.AuthorizationCode;
        transactionSearchResponse.transaction.nsu = object.Payment.ProofOfSale;
        transactionSearchResponse.transaction.amount = object.Payment.Amount;
        transactionSearchResponse.capture = new Capture();
        transactionSearchResponse.capture.amount = object.Payment.CapturedAmount;
        transactionSearchResponse.capture.date = object.Payment.CapturedDate;
        transactionSearchResponse.card = new Card();
        transactionSearchResponse.card.number = object.Payment.CreditCard.CardNumber;
        transactionSearchResponse.card.brand = object.Payment.CreditCard.Brand;
        transactionSearchResponse.card.name = object.Payment.CreditCard.Holder;

        return transactionSearchResponse;
    }
}
