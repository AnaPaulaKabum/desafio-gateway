import { TransactionDTO } from '../../../../../5-Shared/DTO/TransactionDTO.js';
import { TransactionCieloCreateRequest } from '../../Request/TransactionCieloCreateRequest.js';

export abstract class TransactionDTOToTrasactionCielo {
    static generateCredit(Transaction: TransactionDTO): TransactionCieloCreateRequest {
        let transactionCielo = new TransactionCieloCreateRequest();

        /*transactionCielo.numberRequest = Transaction.numberRequest;
        transactionCielo.kind = Transaction.kind;
        transactionCielo.amount = Transaction.amount;
        transactionCielo.installments = Transaction.installments;
        transactionCielo.cardholderName = Transaction.cardholderName;
        transactionCielo.cardNumber = Transaction.cardNumber;
        transactionCielo.expirationMonth = Transaction.expirationMonth;
        transactionCielo.expirationYear = Transaction.expirationYear;
        transactionCielo.securityCode = Transaction.securityCode;
        transactionCielo.softDescriptor = Transaction.softDescriptor;*/

        return transactionCielo;
    }
    static generateDebit(Transaction: TransactionDTO): TransactionCieloCreateRequest {
        let transactionCielo = new TransactionCieloCreateRequest();

        /*transactionCielo.numberRequest = Transaction.numberRequest;
        transactionCielo.kind = Transaction.kind;
        transactionCielo.amount = Transaction.amount;
        transactionCielo.installments = Transaction.installments;
        transactionCielo.cardholderName = Transaction.cardholderName;
        transactionCielo.cardNumber = Transaction.cardNumber;
        transactionCielo.expirationMonth = Transaction.expirationMonth;
        transactionCielo.expirationYear = Transaction.expirationYear;
        transactionCielo.securityCode = Transaction.securityCode;
        transactionCielo.softDescriptor = Transaction.softDescriptor;*/

        return transactionCielo;
    }
}
