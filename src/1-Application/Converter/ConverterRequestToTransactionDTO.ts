import { TransactionDTO } from "../../5-Shared/DTO/TransactionDTO.js";
import { CreateTransactionRequest } from "../Request/createTransactionRequest.js";

export abstract class ConverterRequestToTransactionDTO{

    static converte(request:CreateTransactionRequest): TransactionDTO {

        const transaction =  new TransactionDTO();

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