import { Transaction } from './Transaction.js';

export class Capture {
    captured: boolean;
    amount: string;
    date: Date;
}

export class Card {
    cardNumber: string;
    brand: string;
    expirationDate: string;
    name: string;
    securityCode: string;
}

export class TransactionComplete {
    transaction: Transaction;
    capture: Capture;
    card: Card;

    isValid() {
        this.transaction.isValid();
    }
}
