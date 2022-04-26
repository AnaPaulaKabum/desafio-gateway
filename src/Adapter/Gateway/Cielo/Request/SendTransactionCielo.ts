import { TypeTransaction } from '../../../../Shared/Enum/TypeTransaction.enum';
import { BrandCard } from '../../../../Domain/Enum/BrandCard';
import { Card } from '../../../../Domain/Entity/Transaction/Card';

class Payment {
    type: string;
    amount: number;
    installments: number;
    softDescriptor?: string;
    returnUrl: string;

    isValidCredit() {
        this.isValidBasic();
        if (!this.installments) throw new Error('Campo installments é obrigatório');
    }

    isValidDebit() {
        this.isValidBasic();
        if (!this.returnUrl) throw new Error('Campo returnUrl é obrigatório');
    }

    private isValidBasic() {
        if (!this.type) throw new Error('Campo type é obrigatório');
        if (!this.amount) throw new Error('Campo amount é obrigatório');
    }
}

class CreditCard {
    cardNumber: string;
    expirationDate: string;
    brand: BrandCard | undefined;
    holder: string;
    securityCode: string;

    constructor(card: Card) {
        this.cardNumber = card.number;
        this.expirationDate = card.expirationMonth + '/' + card.expirationYear;
        this.brand = card.brand;
        this.holder = card.name;
        this.securityCode = card.securityCode;
    }
}

export class SendTransactionCielo {
    merchantOrderId: string;
    payment: Payment;
    creditCard: CreditCard;
    kind: TypeTransaction;
    constructor(type: TypeTransaction, card: Card) {
        this.payment = new Payment();

        this.kind = type;
        if (this.kind === TypeTransaction.CREDIT) this.payment.type = 'CreditCard';
        if (this.kind === TypeTransaction.DEBIT) this.payment.type = 'DebitCard';
        this.creditCard = new CreditCard(card);
    }

    isValid() {
        if (!this.merchantOrderId) throw new Error('Campo merchantOrderId é obrigatório');

        if (this.kind === TypeTransaction.CREDIT) {
            this.isValidCredit();
            return;
        }

        this.isValidDebit();
    }

    private isValidCredit() {
        this.payment.isValidCredit();
    }

    private isValidDebit() {
        this.payment.isValidDebit();
    }
}
