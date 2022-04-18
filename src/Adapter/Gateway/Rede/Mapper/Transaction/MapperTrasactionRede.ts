import { TransactionDTO } from '../../../../../Shared/DTO/TransactionDTO';
import { TransactionRedeCreateRequest } from '../../Request/TransactionRedeCreateRequest';

export class MapperTrasactionRede {
    static toTransactionRede(transaction: TransactionDTO): TransactionRedeCreateRequest {
        let transactionRede = new TransactionRedeCreateRequest();

        transactionRede.numberRequest = transaction.numberRequest;
        transactionRede.kind = transaction.kind;
        transactionRede.amount = transaction.amount;
        transactionRede.installments = transaction.installments;
        transactionRede.cardholderName = transaction.cardHolderName;
        transactionRede.cardNumber = transaction.cardNumber;
        transactionRede.expirationMonth = transaction.expirationMonth;
        transactionRede.expirationYear = transaction.expirationYear;
        transactionRede.securityCode = transaction.cardSecurityCode;
        transactionRede.softDescriptor = transaction.softDescriptor;

        return transactionRede;
    }
}
