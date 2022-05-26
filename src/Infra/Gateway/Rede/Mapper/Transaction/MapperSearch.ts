import { plainToInstance } from 'class-transformer';
import { SearchTransactionResponse } from '../../Response/SearchTransactionResponse';
import { SearchTransactionOrderDTO } from '../../../../../Shared/DTO/Order/SearchTransactionOrder';
import { TypeTransaction } from '../../../../../Shared/Enum/TypeTransaction.enum';
import { StatusTransaction } from '../../../../../Shared/Enum/StatusTransaction';
import { TransactionOrderDTOType } from '../../../../../Shared/DTO/Order/TransactionOrderDTOType';

export class MapperSearch {
    private constructor() {}

    static toTransactionComplete(Json: any): SearchTransactionOrderDTO {
        let object = plainToInstance(SearchTransactionResponse, Json);

        const transaction = MapperSearch.createTransaction(object);

        let searchTransaction = new SearchTransactionOrderDTO();
        searchTransaction.transaction = transaction;
        searchTransaction.numberCreditCard = object.authorization.cardBin + object.authorization.last4;

        if (object.capture.amount > 0) {
            searchTransaction.captureAmount = object.capture.amount;
            searchTransaction.captureDate = object.capture.dateTime;
        }

        if (object.refunds.amount > 0) {
            searchTransaction.cancelAmount = object.refunds.amount;
            searchTransaction.cancelDate = object.refunds.dateTime;
        }

        return searchTransaction;
    }

    private static createTransaction(object: SearchTransactionResponse): TransactionOrderDTOType {
        let kind;
        if (object.authorization.kind === 'Credit') {
            kind = TypeTransaction.CREDIT;
        } else if (object.authorization.kind === 'Debit') {
            kind = TypeTransaction.DEBIT;
        }

        return {
            tid: object.authorization.tid,
            amount: object.authorization.amount,
            installments: object.authorization.installments,
            message: object.authorization.returnMessage,
            numberRequest: object.authorization.reference,
            authorizationCode: object.authorization.authorizationCode,
            nsu: object.authorization.nsu,
            status: StatusTransaction.NO_CAPTURE,
            kind: kind,
        };
    }
}
