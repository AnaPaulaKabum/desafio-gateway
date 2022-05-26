import { TransactionOrder } from './TransactionOrder';
import { SearchTransactionOrderDTOType } from '../../../Shared/DTO/Order/SearchTransactionOrderType';

export class SearchTransactionOrder {
    private _captureAmount: number;
    private _captureDate: Date;
    private _cancelAmount: number;
    private _cancelDate: Date;

    constructor(private readonly _transaction: TransactionOrder, private readonly _numberCreditCard: string) {
        if (!_numberCreditCard) throw new Error('Campo numberCreditCard é obrigatório');
    }

    get numberCreditCard(): string {
        return this._numberCreditCard;
    }

    get captureAmount(): number {
        return this._captureAmount;
    }

    get captureDate(): Date {
        return this._captureDate;
    }

    get cancelAmount(): number {
        return this._cancelAmount;
    }

    get cancelDate(): Date {
        return this._cancelDate;
    }

    public setCapturar(amount: number, date: Date) {
        if (!amount) throw new Error('Campo captureAmount é obrigatório');
        if (amount < 0) throw new Error('Amount não pode ser negativo');
        this._captureAmount = amount;
        this._captureDate = date;
    }

    public setCancel(amount: number, date: Date) {
        if (!amount) throw new Error('Campo cancelAmount é obrigatório');
        if (amount < 0) throw new Error('Amount não pode ser negativo');
        this._cancelAmount = amount;
        this._cancelDate = date;
    }

    static createForDTO(searchTransactionDTO: SearchTransactionOrderDTOType): SearchTransactionOrder {
        const transactionOrder = TransactionOrder.createForDTO(searchTransactionDTO.transaction);
        const searchTransactionOrder = new SearchTransactionOrder(
            transactionOrder,
            searchTransactionDTO.numberCreditCard,
        );
        if (searchTransactionDTO.captureAmount && searchTransactionDTO.captureDate)
            searchTransactionOrder.setCapturar(searchTransactionDTO.captureAmount, searchTransactionDTO.captureDate);
        if (searchTransactionDTO.cancelAmount && searchTransactionDTO.cancelDate)
            searchTransactionOrder.setCancel(searchTransactionDTO.cancelAmount, searchTransactionDTO.cancelDate);

        return searchTransactionOrder;
    }
}
