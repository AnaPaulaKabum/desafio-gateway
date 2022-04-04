import { Capture } from './Capture.js';
import { Card } from './Card.js';
import { Transaction } from './Transaction.js';

export class TransactionComplete {
    transaction: Transaction;
    capture: Capture;
    card: Card;

    constructor() {
        this.transaction = new Transaction();
        this.capture = new Capture();
        this.card = new Card();
    }

    isValid() {
        this.transaction.isValid();
        this.capture.isValid();
        this.card.isValid();
    }
}
