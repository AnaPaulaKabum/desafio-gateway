import { Capture } from './Capture.js';
import { Transaction } from './Transaction.js';

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
        this.capture.isValid();

        if (this.card.number === undefined) throw new Error('Campo cardNumber é obrigatório');

        if (this.card.name === undefined) throw new Error('Campo cardName é obrigatório');
    }
}
