import { Capture } from './Capture.js';
import { Card } from './Card.js';
import { Refund } from './Refund.js';
import { Transaction } from './Transaction.js';

export class TransactionComplete {
    transaction: Transaction;
    capture: Capture;
    card: Card;
    refund: Refund;

    constructor() {
        this.transaction = new Transaction();
        this.card = new Card();
    }

    isValid() {
        this.transaction.isValid();
        this.card.isValid();

        if (this.capture) this.capture.isValid();
        if (this.refund) this.refund.isvalid();
    }
}
