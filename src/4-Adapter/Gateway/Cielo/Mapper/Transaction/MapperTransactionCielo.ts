import { TransactionDTO } from '../../../../../5-Shared/DTO/TransactionDTO.js';
import { TypeTransaction } from '../../../../../5-Shared/Enum/TypeTransaction.enum.js';
import { SendTransactionCielo } from '../../Request/SendTransactionCielo.js';

export abstract class MapperTransactionCielo {
    static generateCredit(transaction: TransactionDTO): SendTransactionCielo {
        console.log('...gerenateCredit');

        let transactionCredit = new SendTransactionCielo(TypeTransaction.CREDIT);
        transactionCredit.merchantOrderId = transaction.numberRequest;
        transactionCredit.payment.amount = transaction.amount;
        transactionCredit.payment.installments = transaction.installments;
        transactionCredit.payment.softDescriptor = transaction.softDescriptor;
        transactionCredit.creditCard.cardNumber = transaction.cardNumber;
        transactionCredit.creditCard.expirationDate = transaction.expirationMonth + '/' + transaction.expirationYear;
        transactionCredit.creditCard.holder = transaction.cardHolderName;
        transactionCredit.creditCard.securityCode = transaction.cardSecurityCode;

        transactionCredit.isValid();
        return transactionCredit;
    }
    static generateDebit(transaction: TransactionDTO): SendTransactionCielo {
        console.log('...gerenateDebit');

        let transactionDebit = new SendTransactionCielo(TypeTransaction.DEBIT);
        transactionDebit.merchantOrderId = transaction.numberRequest;
        transactionDebit.payment.amount = transaction.amount;
        transactionDebit.payment.returnUrl = 'www.teste.com.br';

        transactionDebit.creditCard.cardNumber = transaction.cardNumber;
        transactionDebit.creditCard.expirationDate = transaction.expirationMonth + '/' + transaction.expirationYear;
        transactionDebit.creditCard.holder = transaction.cardHolderName;
        transactionDebit.creditCard.securityCode = transaction.cardSecurityCode;

        transactionDebit.isValid();
        return transactionDebit;
    }
}
