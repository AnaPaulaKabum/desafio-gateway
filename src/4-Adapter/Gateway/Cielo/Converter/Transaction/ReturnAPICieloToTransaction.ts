import { plainToInstance } from 'class-transformer';
import { StatusTransaction } from '../../../../../5-Shared/Enum/StatusTransaction.js';
import { TypeTransaction } from '../../../../../5-Shared/Enum/TypeTransaction.enum.js';
import { Transaction } from '../../../../../3-Domain/Entity/Transaction/Transaction.js';
import { SendCreditCieloTransitionResponse } from '../../Mock/Response/SendCreditCieloTransitionResponse.js';
import { SendDebitTransitionResponse } from '../../Mock/Response/SendDebitTransitionResponse.js';

export abstract class ReturnAPICieloToTransaction {
    static converte(Json: any, typeTransaction: TypeTransaction): Transaction {
        let transaction = new Transaction();
        if (typeTransaction === TypeTransaction.CREDIT) {
            let object = plainToInstance(SendCreditCieloTransitionResponse, Json);

            transaction.numberRequest = object.Payment.PaymentId;
            transaction.tid = object.Payment.Tid;
            transaction.authorizationCode = object.Payment.AuthorizationCode;
            transaction.nsu = object.Payment.ProofOfSale;
            transaction.message = object.Payment.ReturnMessage;
            transaction.amount = object.Payment.Amount;
            transaction.installments = object.Payment.Installments;
            transaction.status = StatusTransaction.NO_CAPTURE;
        } else {
            let object = plainToInstance(SendDebitTransitionResponse, Json);
            transaction.numberRequest = object.Payment.PaymentId;
            transaction.tid = object.Payment.Tid;
            transaction.message = object.Payment.ReturnMessage;
            transaction.amount = object.Payment.Amount;
            transaction.installments = object.Payment.Installments;
            transaction.status = StatusTransaction.NO_CAPTURE;
            transaction.authorizationCode = '';
            transaction.nsu = '';
        }
        transaction.kind = typeTransaction;
        transaction.isValid();
        return transaction;
    }
}
