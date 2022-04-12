import { CaptureTransactionDTO } from '../../5-Shared/DTO/CaptureTransactionDTO';
import { SearchTransactionDTO } from '../../5-Shared/DTO/SearchTransactionDTO';
import { TransactionDTO } from '../../5-Shared/DTO/TransactionDTO';
import { CaptureRequest } from '../Request/CaptureRequest';
import { SearchRequest } from '../Request/SearchRequest';
import { TransactionRequest } from '../Request/TransactionRequest';

export abstract class FactoryDTO {
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
