import { CaptureOrder } from './ValueObject/CaptureOrder';
import { Card } from './ValueObject/Card';
import { CancelOrder } from './ValueObject/CancelOrder';
import { TransactionOrder } from './ValueObject/TransactionOrder';

export class SearchTransactionOrder {
    private _capture: CaptureOrder;
    private _cancel: CancelOrder;

    constructor(private readonly transaction: TransactionOrder, private readonly card: Card) {}

    set capture(value: CaptureOrder) {
        if (this._capture) throw new Error('É possivel atribuir o capture apenas uma vez.');
        this._capture = value;
    }

    get capture(): CaptureOrder {
        return this._capture;
    }

    set cancel(value: CancelOrder) {
        if (this._cancel) throw new Error('É possivel atribuir o capture apenas uma vez.');
        this._cancel = value;
    }

    get cancel(): CancelOrder {
        return this._cancel;
    }
}
