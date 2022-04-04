import { TypeTransaction } from '../../../../5-Shared/Enum/TypeTransaction.enum.js';
import { BrandCard } from '../Enum/BrandCard.js';

class Payment {
    type: string;
    amount: number;
    installments: number;
    softDescriptor?: string;
    returnUrl: string;

    isValidCredit() {
        this.isValid();
        if (!this.installments) throw new Error('Campo installments é obrigatório');
    }

    isValidDebit() {
        this.isValid();
        if (!this.returnUrl) throw new Error('Campo returnUrl é obrigatório');
    }

    private isValid() {
        if (!this.type) throw new Error('Campo type é obrigatório');
        if (!this.amount) throw new Error('Campo amount é obrigatório');
    }
}

class CreditCard {
    private _cardNumber: string;
    expirationDate: string;
    brand: BrandCard;
    holder: string;
    securityCode: string;

    get cardNumber(): string {
        return this._cardNumber;
    }

    set cardNumber(value: string) {
        this._cardNumber = value;
        this.discoverBrand();
    }

    isValid() {
        if (!this.cardNumber) throw new Error('Campo cardNumber é obrigatório');
        if (!this.expirationDate) throw new Error('Campo expirationDate é obrigatório');
        if (!this.brand) throw new Error('Campo brand é obrigatório');
    }

    private discoverBrand() {
        this.brand = BrandCard.MASTER;
    }
}

export class SendTransactionCielo {
    //merchantId: string;
    //merchantKey: string;
    merchantOrderId: string;
    payment: Payment;
    creditCard: CreditCard;
    kind: TypeTransaction;
    constructor(type: TypeTransaction) {
        this.payment = new Payment();

        this.kind = type;
        if (this.kind === TypeTransaction.CREDIT) this.payment.type = 'CreditCard';
        if (this.kind === TypeTransaction.DEBIT) this.payment.type = 'DebitCard';
        this.creditCard = new CreditCard();
    }

    isValid() {
        if (!this.merchantOrderId) throw new Error('Campo merchantOrderId é obrigatório');

        this.creditCard.isValid();

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
        //this.creditCard.isValid();
    }
}
