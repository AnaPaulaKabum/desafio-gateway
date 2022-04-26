import { CancelOrder } from '../../../Domain/Entity/Transaction/CancelOrder';
import { CaptureOrder } from '../../../Domain/Entity/Transaction/CaptureOrder';
import { TransactionOrderDTO } from './TransactionOrderDTO';

export class SearchTransactionOrderDTO {
    transaction: TransactionOrderDTO;
    captureAmount: number;
    captureDate: Date;

    capture: CaptureOrder;
    cancel: CancelOrder;
    cardNumber: string;
    creditCard: string;
}
