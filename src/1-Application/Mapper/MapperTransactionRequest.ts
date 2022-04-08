import { CaptureTransactionDTO } from '../../5-Shared/DTO/CaptureTransactionDTO.js';
import { SearchTransactionDTO } from '../../5-Shared/DTO/SearchTransactionDTO.js';
import { TransactionDTO } from '../../5-Shared/DTO/TransactionDTO.js';
import { CaptureRequest } from '../Request/CaptureRequest.js';
import { SearchRequest } from '../Request/SearchRequest.js';
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
        transaction.cardSecurityCode = transactionRequest.cardSecurityCode;
        transaction.softDescriptor = transactionRequest.softDescriptor;

        return transaction;
    }

    static toSearchDTO(searchRequest: SearchRequest): SearchTransactionDTO {
        const searchTransaction = new SearchTransactionDTO();
        searchTransaction.numberRequest = searchTransaction.numberRequest;

        return searchTransaction;
    }

    static toCaptureDTO(captureRequest: CaptureRequest): CaptureTransactionDTO {
        const captureTransactionDTO = new CaptureTransactionDTO();

        captureTransactionDTO.numberRequest = captureRequest.numberRequest;
        captureTransactionDTO.amount = captureRequest.amount;

        return captureRequest;
    }
}
