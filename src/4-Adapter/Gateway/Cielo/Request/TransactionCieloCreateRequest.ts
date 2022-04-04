import { BrandCard } from '../Enum/BrandCard.js';

class Payment {
    type: string;
    amount: number;
    installments: number;
    softDescriptor?: string;

    isValid() {
        if (!this.type) throw new Error('Campo type é obrigatório');
        if (!this.amount) throw new Error('Campo amount é obrigatório');
        if (!this.installments) throw new Error('Campo installments é obrigatório');
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

export class TransactionCieloCreateRequest {
    //merchantId: string;
    //merchantKey: string;
    merchantOrderId: string;
    payment: Payment;
    creditCard: CreditCard;
    constructor() {
        this.payment = new Payment();
        this.payment.type = 'CreditCard';
        this.creditCard = new CreditCard();
    }

    isValid() {
        if (!this.merchantOrderId) throw new Error('Campo merchantOrderId é obrigatório');

        this.payment.isValid();
        this.creditCard.isValid();
    }
}
