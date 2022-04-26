import { plainToInstance } from 'class-transformer';
import { SearchTransactionResponse } from '../../Response/SearchTransactionResponse';
import { SearchTransactionOrderDTO } from '../../../../../Shared/DTO/Order/SearchTransactionOrder';
import { TypeTransaction } from '../../../../../Shared/Enum/TypeTransaction.enum';
import { StatusTransaction } from '../../../../../Shared/Enum/StatusTransaction';
import { TransactionOrderDTO } from '../../../../../Shared/DTO/Order/TransactionOrderDTO';

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

    private static createTransaction(object: SearchTransactionResponse): TransactionOrderDTO {
        const transactionOrderDTO = new TransactionOrderDTO();

        if (object.authorization.kind === 'Credit') {
            transactionOrderDTO.kind = TypeTransaction.CREDIT;
        } else if (object.authorization.kind === 'Debit') {
            transactionOrderDTO.kind = TypeTransaction.DEBIT;
        }
        transactionOrderDTO.tid = object.authorization.tid;
        transactionOrderDTO.amount = object.authorization.amount;
        transactionOrderDTO.installments = object.authorization.installments;
        transactionOrderDTO.message = object.authorization.returnMessage;
        transactionOrderDTO.numberRequest = object.authorization.reference;
        transactionOrderDTO.authorizationCode = object.authorization.authorizationCode;
        transactionOrderDTO.nsu = object.authorization.nsu;
        transactionOrderDTO.status = StatusTransaction.NO_CAPTURE;

        return transactionOrderDTO;
    }
}
