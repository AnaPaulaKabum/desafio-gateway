import { Transaction } from './Transaction.js';

export class Capture {
    amount: number;
    date: Date;
}

export class Card {
    number: string;
    brand: string;
    name: string;
}

export class TransactionComplete {
    transaction: Transaction;
    capture: Capture;
    card: Card;

    isValid() {
        this.transaction.isValid();

        if (this.card.number === undefined) throw new Error('Campo cardNumber é obrigatório');

        if (this.card.name === undefined) throw new Error('Campo cardName é obrigatório');

        if (this.capture.amount > 0 && !this.capture.date) {
            throw new Error('Campo capture.date é obrigatório quando possui valor na captura');
        }
    }
}
