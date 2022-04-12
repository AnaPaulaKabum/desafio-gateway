import { CaptureOrder } from './CaptureOrder';
import { Card } from './ValueObject/Card';
import { RefundOrder } from './ValueObject/RefundOrder';
import { TransactionOrder } from './ValueObject/TransactionOrder';

export class SearchTransactionOrder {
    transaction: TransactionOrder;
    capture: CaptureOrder;
    card: Card;
    refund: RefundOrder;

    constructor() {}

    isValid() {
        if (this.capture) this.capture.isValid();
        // if (this.refund) this.refund.isvalid();
    }
}
