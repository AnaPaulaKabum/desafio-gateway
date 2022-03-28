import { plainToInstance } from 'class-transformer';
import { Transaction } from '../../../../../3-Domain/Entity/Transaction/Transaction.js';
import { CaptureTransactionResponse } from '../../Response/CaptureTransactionResponse.js';

export abstract class ReturnAPIToCaptureTransaction {
    static converte(Json: any): Transaction {
        let object = plainToInstance(CaptureTransactionResponse, Json);

        let transactionSearchResponse = new Transaction();

        transactionSearchResponse.tid = object.tid;
        transactionSearchResponse.numberRequest = object.reference;
        transactionSearchResponse.authorizationCode = object.authorizationCode;
        transactionSearchResponse.nsu = object.nsu;

        return transactionSearchResponse;
    }
}
