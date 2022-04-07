import { TransactionDTO } from '../../5-Shared/DTO/TransactionDTO.js';
import { TransactionRequest } from '../Request/TransactionRequest.js';

export abstract class MapperTransactionRequest {
    static toTrasactionDTO(transactionRequest: TransactionRequest): TransactionDTO {
        const transaction = new TransactionDTO();

        transaction.numberRequest = transactionRequest.numberRequest;
        transaction.kind = transactionRequest.kind;
        transaction.amount = transactionRequest.amount;
        transaction.installments = transactionRequest.installments;
        transaction.cardHolderName = transactionRequest.cardHolderName;
        transaction.cardNumber = transactionRequest.cardNumber;
        transaction.expirationMonth = transactionRequest.expirationMonth;
        transaction.expirationYear = transactionRequest.expirationYear;
        transaction.securityCode = transactionRequest.cardSecurityCode;
        transaction.softDescriptor = transactionRequest.softDescriptor;

        return transaction;
    }
}
