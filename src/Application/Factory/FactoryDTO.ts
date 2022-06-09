import { CancelTransactionDTOType } from '../../Domain/Shared/DTO/CancelTransactionDTOType';
import { CaptureTransactionDTOType } from '../../Domain/Shared/DTO/CaptureTransactionDTOType';
import { SearchTransactionDTOType } from '../../Domain/Shared/DTO/SearchTransactionDTOType';
import { TransactionDTOType } from '../../Domain/Shared/DTO/TransactionDTOType';
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

    static toSearchDTO(searchRequest: SearchRequest): SearchTransactionDTOType {
        return { numberRequest: searchRequest.numberRequest, tid: searchRequest.tid };
    }

    static toCaptureDTO(captureRequest: CaptureRequest): CaptureTransactionDTOType {
        return { tid: captureRequest.tid, amount: captureRequest.amount };
    }

    static toCancelDTO(cancelRequest: CancelRequest): CancelTransactionDTOType {
        return {
            tid: cancelRequest.tid,
            amount: cancelRequest.amount,
        };
    }
}
