import { plainToInstance } from "class-transformer";
import { Transaction } from "../../../../../3-Domain/Entity/Transaction.js";
import { SearchTransactionReturn } from "../../Response/SearchTransactionReturn.js";

export abstract class ReturnAPIToSearchTransaction {

    static converte(Json:any): Transaction{

        let object = plainToInstance(SearchTransactionReturn, Json); 

        let transactionSearchResponse = new Transaction();

        transactionSearchResponse.tid = object.authorization.tid;
        transactionSearchResponse.numberRequest = object.authorization.reference;
        transactionSearchResponse.authorizationCode = object.authorization.authorizationCode;
        transactionSearchResponse.nsu = object.capture.nsu;

        return transactionSearchResponse;
    }

}