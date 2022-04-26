import { Card } from '../../../../../Domain/Entity/Transaction/Card';
import { TransactionDTO } from '../../../../../Shared/DTO/TransactionDTO';
import { TypeTransaction } from '../../../../../Shared/Enum/TypeTransaction.enum';
import { SendTransactionCielo } from '../../Request/SendTransactionCielo';

export class MapperTransactionCielo {
    private constructor() {}

    static generateCredit(transaction: TransactionDTO): SendTransactionCielo {
        let transactionCredit = new SendTransactionCielo(
            TypeTransaction.CREDIT,
            MapperTransactionCielo.createCard(transaction),
        );

        transactionCredit.merchantOrderId = transaction.numberRequest;
        transactionCredit.payment.amount = transaction.amount;
        transactionCredit.payment.installments = transaction.installments;
        transactionCredit.payment.softDescriptor = transaction.softDescriptor;

        transactionCredit.isValid();
        return transactionCredit;
    }
    static generateDebit(transaction: TransactionDTO): SendTransactionCielo {
        let transactionDebit = new SendTransactionCielo(
            TypeTransaction.DEBIT,
            MapperTransactionCielo.createCard(transaction),
        );

        transactionDebit.merchantOrderId = transaction.numberRequest;
        transactionDebit.payment.amount = transaction.amount;
        transactionDebit.payment.returnUrl = 'www.teste.com.br';

        transactionDebit.isValid();
        return transactionDebit;
    }

    private static createCard(transaction: TransactionDTO): Card {
        const cardNumber = transaction.cardNumber;
        const expirationMonth = transaction.expirationMonth;
        const expirationYear = transaction.expirationYear;
        const holder = transaction.cardHolderName;
        const securityCode = transaction.cardSecurityCode;

        return new Card(cardNumber, holder, expirationMonth, expirationYear, securityCode);
    }
}
