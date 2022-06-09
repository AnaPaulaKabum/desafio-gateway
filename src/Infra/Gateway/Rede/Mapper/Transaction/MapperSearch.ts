import { plainToInstance } from 'class-transformer';
import { SearchTransactionResponse } from '../../Response/SearchTransactionResponse';
import { SearchTransactionOrderDTOType } from '../../../../../Domain/Shared/DTO/Order/SearchTransactionOrderType';
import { TypeTransaction } from '../../../../../Domain/Shared/Enum/TypeTransaction.enum';
import { StatusTransaction } from '../../../../../Domain/Shared/Enum/StatusTransaction';
import { TransactionOrderDTOType } from '../../../../../Domain/Shared/DTO/Order/TransactionOrderDTOType';

export class MapperSearch {
    private constructor() {}

    static toTransactionComplete(Json: any): SearchTransactionOrderDTOType {
        let object = plainToInstance(SearchTransactionResponse, Json);

        const transaction = MapperSearch.createTransaction(object);
        const numberCreditCard = object.authorization.cardBin + object.authorization.last4;

        if (object.capture.amount > 0) {
            const captureAmount = object.capture.amount;
            const captureDate = object.capture.dateTime;

            return { transaction, numberCreditCard, captureAmount, captureDate };
        }

        if (object.refunds.amount > 0) {
            const cancelAmount = object.refunds.amount;
            const cancelDate = object.refunds.dateTime;

            return { transaction, numberCreditCard, cancelAmount, cancelDate };
        }

        return { transaction, numberCreditCard };
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
