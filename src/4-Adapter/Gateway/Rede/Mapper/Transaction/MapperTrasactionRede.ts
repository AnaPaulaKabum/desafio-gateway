import { TransactionDTO } from '../../../../../5-Shared/DTO/TransactionDTO.js';
import { TransactionRedeCreateRequest } from '../../Request/TransactionRedeCreateRequest.js';

export abstract class MapperTrasactionRede {
    static toTransactionRede(transaction: TransactionDTO): TransactionRedeCreateRequest {
        let transactionRede = new TransactionRedeCreateRequest();

        transactionRede.numberRequest = transaction.numberRequest;
        transactionRede.kind = transaction.kind;
        transactionRede.amount = transaction.amount;
        transactionRede.installments = transaction.installments;
        transactionRede.cardholderName = transaction.cardholderName;
        transactionRede.cardNumber = transaction.cardNumber;
        transactionRede.expirationMonth = transaction.expirationMonth;
        transactionRede.expirationYear = transaction.expirationYear;
        transactionRede.securityCode = transaction.securityCode;
        transactionRede.softDescriptor = transaction.softDescriptor;

        return transactionRede;
    }
}
