import { CancelOrder } from '../../../Domain/Entity/Transaction/CancelOrder';
import { CaptureOrder } from '../../../Domain/Entity/Transaction/CaptureOrder';
import { TransactionOrderDTO } from './TransactionOrderDTO';

export class SearchTransactionOrderDTO {
    capture: CaptureOrder;
    cancel: CancelOrder;
    cardNumber: string;
    transaction: TransactionOrderDTO;
    creditCard: string;
}
