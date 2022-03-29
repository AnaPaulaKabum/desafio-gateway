import { plainToInstance } from 'class-transformer';
import { StatusTransaction } from '../../../../../3-Domain/Core/Interfaces/Transaction/Enum/StatusTransaction.js';
import { TypeTransaction } from '../../../../../3-Domain/Core/Interfaces/Transaction/Enum/TypeTransaction.enum.js';
import { Transaction } from '../../../../../3-Domain/Entity/Transaction/Transaction.js';
import { SendCieloTransitionResponse } from '../../Mock/Response/SendCieloTransitionResponse.js';

export abstract class ReturnAPICieloToTransaction {
    static converte(Json: any, typeTransaction: TypeTransaction): Transaction {
        let transaction = new Transaction();

        if (typeTransaction === TypeTransaction.CREDIT) {
            let object = plainToInstance(SendCieloTransitionResponse, Json);

            transaction.numberRequest = object.Payment.PaymentId;
            transaction.tid = object.Payment.Tid;
            transaction.authorizationCode = object.Payment.AuthorizationCode;
            transaction.nsu = object.Payment.ProofOfSale;
            transaction.message = object.Payment.ReturnMessage;
            transaction.amount = object.Payment.Amount;
            transaction.installments = object.Payment.Installments;
            transaction.status = StatusTransaction.NO_CAPTURE;
        } else {
            //create method to debit
        }
        transaction.kind = typeTransaction;
        transaction.isValid();
        return transaction;
    }
}
