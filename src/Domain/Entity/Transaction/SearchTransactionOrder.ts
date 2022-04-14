import { CaptureOrder } from './ValueObject/CaptureOrder';
import { Card } from './ValueObject/Card';
import { CancelOrder } from './ValueObject/CancelOrder';
import { TransactionOrder } from './ValueObject/TransactionOrder';

export class SearchTransactionOrder {
    transaction: TransactionOrder;
    capture: CaptureOrder;
    card: Card;
    refund: CancelOrder;
}
