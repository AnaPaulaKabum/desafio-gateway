import { TransactionOrder } from './TransactionOrder';
import { SearchTransactionOrderDTO } from '../../../Shared/DTO/Order/SearchTransactionOrder';

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

    public setCapturar(amount, date) {
        if (!amount) throw new Error('Campo captureAmount é obrigatório');
        if (!date) throw new Error('Campo captureDate é obrigatório');

        this._captureAmount = amount;
        this._captureDate = date;
    }

    public setCancel(amount, date) {
        if (!amount) throw new Error('Campo cancelAmount é obrigatório');
        if (!date) throw new Error('Campo cancelDate é obrigatório');

        this._cancelAmount = amount;
        this._cancelDate = date;
    }

    static createForDTO(searchTransactionDTO: SearchTransactionOrderDTO): SearchTransactionOrder {
        const transactionOrder = TransactionOrder.createForDTO(searchTransactionDTO.transaction);

        const searchTransactionOrder = new SearchTransactionOrder(
            transactionOrder,
            searchTransactionDTO.numberCreditCard,
        );

        if (searchTransactionDTO.captureAmount > 0) {
            searchTransactionOrder.setCapturar(searchTransactionDTO.captureAmount, searchTransactionDTO.captureDate);
        }

        if (searchTransactionDTO.cancelAmount > 0) {
            searchTransactionOrder.setCancel(searchTransactionDTO.cancelAmount, searchTransactionDTO.cancelDate);
        }

        return searchTransactionOrder;
    }
}
