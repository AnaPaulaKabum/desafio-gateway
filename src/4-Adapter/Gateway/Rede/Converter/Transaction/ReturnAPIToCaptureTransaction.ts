import { plainToInstance } from "class-transformer";
import { TransactionResponse } from "../../../../../3-Domain/Entity/TransactionSearchResponse.js";
import { CaptureTransactionReturn } from "../../Response/CaptureTransactionReturn.js";

export abstract class ReturnAPIToCaptureTransaction {

    static converte(Json:any): TransactionResponse{

        let object = plainToInstance(CaptureTransactionReturn, Json); 

        let transactionSearchResponse = new TransactionResponse();

        transactionSearchResponse.TID = object.tid;
        transactionSearchResponse.numberRequest = object.reference;
        transactionSearchResponse.authorizationCode = object.authorizationCode;
        transactionSearchResponse.nsu = object.nsu;

        return transactionSearchResponse;
    }

}