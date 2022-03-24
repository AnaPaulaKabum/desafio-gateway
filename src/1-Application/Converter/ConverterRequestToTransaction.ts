import { Transaction } from "../../3-Domain/Entity/Transaction.js";
import { CreateTransactionRequest } from "../Request/createTransactionRequest.js";

export abstract class ConverterRequestToTransaction{

    static converte(request:CreateTransactionRequest): Transaction{

        const transaction =  new Transaction();

        transaction.numberRequest   = request.numberRequest;
        transaction.kind            = request.kind;
        transaction.amount          = request.amount;
        transaction.installments    = request.installments;
        transaction.cardholderName  = request.cardholderName;
        transaction.cardNumber      = request.cardNumber;
        transaction.expirationMonth = request.expirationMonth;
        transaction.expirationYear  = request.expirationYear;
        transaction.securityCode    = request.securityCode;
        transaction.softDescriptor  = request.softDescriptor;

        return transaction;
    }
}