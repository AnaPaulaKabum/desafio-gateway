import { CancelTransactionDTO } from '../../Shared/DTO/CancelTransactionDTO';
import { CaptureTransactionDTO } from '../../Shared/DTO/CaptureTransactionDTO';
import { SearchTransactionDTO } from '../../Shared/DTO/SearchTransactionDTO';
import { TransactionDTOType } from '../../Shared/DTO/TransactionDTOType';
import { CancelRequest } from '../Request/CancelRequest';
import { CaptureRequest } from '../Request/CaptureRequest';
import { SearchRequest } from '../Request/SearchRequest';
import { TransactionRequest } from '../Request/TransactionRequest';

export class FactoryDTO {
    private constructor() {}

    static toTrasactionDTO(transactionRequest: TransactionRequest): TransactionDTOType {
        return {
            numberRequest: transactionRequest.numberRequest,
            kind: transactionRequest.kind,
            amount: transactionRequest.amount,
            installments: transactionRequest.installments,
            cardHolderName: transactionRequest.cardHolderName,
            cardNumber: transactionRequest.cardNumber,
            expirationMonth: transactionRequest.expirationMonth,
            expirationYear: transactionRequest.expirationYear,
            cardSecurityCode: transactionRequest.cardSecurityCode,
            softDescriptor: transactionRequest.softDescriptor,
        };
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
        captureTransactionDTO.tid = cancelRequest.tid;
        captureTransactionDTO.amount = cancelRequest.amount;

        return captureTransactionDTO;
    }
}
