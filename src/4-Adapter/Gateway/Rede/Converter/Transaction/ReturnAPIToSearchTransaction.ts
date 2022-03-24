import { plainToInstance } from "class-transformer";
import { TransactionResponse } from "../../../../../3-Domain/Entity/TransactionSearchResponse.js";
import { SearchTransactionReturn } from "../../Response/SearchTransactionReturn.js";

export abstract class ReturnAPIToSearchTransaction {

    static converte(Json:any): TransactionResponse{

        let object = plainToInstance(SearchTransactionReturn, Json); 

        let transactionSearchResponse = new TransactionResponse();

        transactionSearchResponse.TID = object.authorization.tid;
        transactionSearchResponse.numberRequest = object.authorization.reference;
        transactionSearchResponse.authorizationCode = object.authorization.authorizationCode;
        transactionSearchResponse.nsu = object.capture.nsu;

        return transactionSearchResponse;
    }

}