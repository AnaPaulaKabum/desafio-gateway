import { CaptureOrder } from './CaptureOrder';
import { Card } from './ValueObject/Card';
import { RefundOrder } from './RefundOrder';
import { TransactionOrder } from './TransactionOrder';

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
