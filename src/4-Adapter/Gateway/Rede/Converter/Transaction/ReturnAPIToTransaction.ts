import { plainToInstance } from 'class-transformer';
import { Transaction } from '../../../../../3-Domain/Entity/Transaction.js';
import { SendTranstionReturn } from '../../Response/SendTransitionReturn.js';

export abstract class ReturnAPIToTransaction {


    static converte(Json:any) : Transaction{
        
        let object = plainToInstance(SendTranstionReturn, Json); 

        let transaction = new Transaction();

        transaction.tid = object.brandTid;
        transaction.numberRequest = object.reference;
        transaction.authorizationCode = object.authorizationCode;
        transaction.nsu = object.nsu;
        transaction.status = object.returnMessage;

        return transaction;
    }
}