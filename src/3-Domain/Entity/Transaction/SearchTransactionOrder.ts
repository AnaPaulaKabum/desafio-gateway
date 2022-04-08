import { CaptureOrder } from './CaptureOrder.js';
import { Card } from './ValueObject/Card.js';
import { RefundOrder } from './RefundOrder.js';
import { TransactionOrder } from './TransactionOrder.js';

export class SearchTransactionOrder {
    transaction: TransactionOrder;
    capture: CaptureOrder;
    card: Card;
    refund: RefundOrder;

    constructor() {
        this.transaction = new TransactionOrder();
    }

    isValid() {
        this.transaction.isValid();

        if (this.capture) this.capture.isValid();
        if (this.refund) this.refund.isvalid();
    }
}
