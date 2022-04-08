import { CaptureOrder } from './CaptureOrder.js';
import { RefundOrder } from './RefundOrder.js';
import { TransactionOrder } from './TransactionOrder.js';

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
    transaction: TransactionOrder;
    capture: CaptureOrder;
    card: Card;
    refund: RefundOrder;

    constructor() {
        this.transaction = new TransactionOrder();
        this.card = new Card();
    }

    isValid() {
        this.transaction.isValid();
        this.card.isValid();

        if (this.capture) this.capture.isValid();
        if (this.refund) this.refund.isvalid();
    }
}
