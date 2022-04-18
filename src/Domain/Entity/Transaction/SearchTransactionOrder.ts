import { CaptureOrder } from './CaptureOrder';
import { CancelOrder } from './CancelOrder';
import { TransactionOrder } from './TransactionOrder';

export class SearchTransactionOrder {
    private _capture: CaptureOrder;
    private _cancel: CancelOrder;
    private _cardNumber: string;

    constructor(private readonly transaction: TransactionOrder) {}

    set capture(value: CaptureOrder) {
        if (this._capture) throw new Error('É possivel atribuir o capture apenas uma vez.');
        this._capture = value;
    }

    get capture(): CaptureOrder {
        return this._capture;
    }

    set cancel(value: CancelOrder) {
        if (this._cancel) throw new Error('É possivel atribuir o cancel apenas uma vez.');
        this._cancel = value;
    }

    get cancel(): CancelOrder {
        return this._cancel;
    }

    set creditCard(value: string) {
        this._cardNumber = value;
    }

    get creditCard(): string {
        return this._cardNumber;
    }
}
