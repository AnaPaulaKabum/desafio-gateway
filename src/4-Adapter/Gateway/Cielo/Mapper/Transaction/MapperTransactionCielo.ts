import { TransactionDTO } from '../../../../../5-Shared/DTO/TransactionDTO.js';
import { SendTransactionCredit } from '../../Request/SendTransactionCredit.js';
import { SendTransactionDebit } from '../../Request/SendTransactionDebit.js';

export abstract class MapperTransactionCielo {
    static generateCredit(transaction: TransactionDTO): SendTransactionCredit {
        console.log('...gerenateCredit');

        let transactionCielo = new SendTransactionCredit();
        transactionCielo.merchantOrderId = transaction.numberRequest;
        transactionCielo.payment.amount = transaction.amount;
        transactionCielo.payment.installments = transaction.installments;
        transactionCielo.payment.softDescriptor = transaction.softDescriptor;
        transactionCielo.creditCard.cardNumber = transaction.cardNumber;
        transactionCielo.creditCard.expirationDate = transaction.expirationMonth + '/' + transaction.expirationYear;
        transactionCielo.creditCard.holder = transaction.cardholderName;
        transactionCielo.creditCard.securityCode = transaction.securityCode;

        transactionCielo.isValid();
        return transactionCielo;
    }
    static generateDebit(Transaction: TransactionDTO): SendTransactionDebit {
        let transactionCielo = new SendTransactionDebit();

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
