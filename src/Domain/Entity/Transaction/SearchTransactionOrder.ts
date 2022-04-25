import { CaptureOrder } from './CaptureOrder';
import { CancelOrder } from './CancelOrder';
import { TransactionOrder } from './TransactionOrder';
import { SearchTransactionOrderDTO } from '../../../Shared/DTO/Order/SearchTransactionOrder';

export class SearchTransactionOrder {
    /*private _capture: CaptureOrder;
    private _cancel: CancelOrder;
    private _cardNumber: string;*/

    private constructor(private readonly _transaction: TransactionOrder) {}

    static createForDTO(searchTransactionDTO: SearchTransactionOrderDTO): SearchTransactionOrder {
        return SearchTransactionOrder.create(searchTransactionDTO.transaction);
    }

    static create(transaction: TransactionOrder) {
        return new SearchTransactionOrder(transaction);
    }
}
