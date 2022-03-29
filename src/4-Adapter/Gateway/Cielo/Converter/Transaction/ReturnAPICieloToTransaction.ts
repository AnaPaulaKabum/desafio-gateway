import { plainToInstance } from 'class-transformer';
import { Transaction } from '../../../../../3-Domain/Entity/Transaction/Transaction.js';
import { SendCieloTransitionResponse } from '../../Mock/Response/SendCieloTransitionResponse.js';

export abstract class ReturnAPICieloToTransaction {
    static converte(Json: any): Transaction {
        let object = plainToInstance(SendCieloTransitionResponse, Json);
        let transaction = new Transaction();
        transaction.tid = object.Payment.Tid;
        //transaction.numberRequest = object.reference;
        transaction.authorizationCode = object.Payment.AuthorizationCode;
        //transaction.nsu = object.nsu;
        //transaction.status = object.returnMessage;

        return transaction;
    }
}
