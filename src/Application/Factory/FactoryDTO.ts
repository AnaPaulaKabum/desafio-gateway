import { CancelTransactionDTO } from '../../Shared/DTO/CancelTransactionDTO';
import { CaptureTransactionDTO } from '../../Shared/DTO/CaptureTransactionDTO';
import { SearchTransactionDTO } from '../../Shared/DTO/SearchTransactionDTO';
import { TransactionDTO } from '../../Shared/DTO/TransactionDTO';
import { CancelRequest } from '../Request/CancelRequest';
import { CaptureRequest } from '../Request/CaptureRequest';
import { SearchRequest } from '../Request/SearchRequest';
import { TransactionRequest } from '../Request/TransactionRequest';

export class FactoryDTO {
    private constructor() {}

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
        searchTransaction.numberRequest = searchRequest.numberRequest;
        searchTransaction.tid = searchRequest.tid;

        return searchTransaction;
    }

    static toCaptureDTO(captureRequest: CaptureRequest): CaptureTransactionDTO {
        const captureTransactionDTO = new CaptureTransactionDTO();
        captureTransactionDTO.tid = captureRequest.tid;
        captureTransactionDTO.amount = captureRequest.amount;

        return captureTransactionDTO;
    }

    static toCancelDTO(cancelRequest: CancelRequest): CancelTransactionDTO {
        const captureTransactionDTO = new CancelTransactionDTO();
        captureTransactionDTO.numberRequest = cancelRequest.numberRequest;
        captureTransactionDTO.amount = cancelRequest.amount;

        return captureTransactionDTO;
    }
}
