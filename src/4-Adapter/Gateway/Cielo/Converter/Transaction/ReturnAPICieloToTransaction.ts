import { plainToInstance } from 'class-transformer';
import { Transaction } from '../../../../../3-Domain/Entity/Transaction/Transaction.js';
import { SendCieloTransitionResponse } from '../../Mock/Response/SendCieloTransitionResponse.js';

export abstract class ReturnAPICieloToTransaction {
    static converte(Json: any): Transaction {
        let object = plainToInstance(SendCieloTransitionResponse, Json);
        let transaction = new Transaction();
        transaction.numberRequest = object.Payment.PaymentId;
        transaction.tid = object.Payment.Tid;
        transaction.authorizationCode = object.Payment.AuthorizationCode;
        transaction.nsu = object.Payment.ProofOfSale;
        transaction.message = object.Payment.ReturnMessage;
        transaction.amount = object.Payment.Amount;
        transaction.softDescriptor = object.Payment.SoftDescriptor;

        transaction.isValid();

        return transaction;
    }
}
