import { CancelOrder } from '../../../Domain/Entity/Transaction/CancelOrder';
import { CaptureOrder } from '../../../Domain/Entity/Transaction/CaptureOrder';
import { TransactionOrder } from '../../../Domain/Entity/Transaction/TransactionOrder';

export class SearchTransactionOrderDTO {
    capture: CaptureOrder;
    cancel: CancelOrder;
    cardNumber: string;
    transaction: TransactionOrder;
    creditCard: string;
}
