import { CaptureOrder } from './CaptureOrder.js';
import { Refund } from './Refund.js';
import { Transaction } from './Transaction.js';

class Card {
    number: string;
    brand: string;
    name: string;

    isValid() {
        if (this.number === undefined) throw new Error('Campo cardNumber é obrigatório');
        if (this.name === undefined) throw new Error('Campo cardName é obrigatório');
    }
}

export class TransactionComplete {
    transaction: Transaction;
    capture: CaptureOrder;
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
