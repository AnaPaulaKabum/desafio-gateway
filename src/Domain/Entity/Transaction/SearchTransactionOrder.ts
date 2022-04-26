import { TransactionOrder } from './TransactionOrder';
import { SearchTransactionOrderDTO } from '../../../Shared/DTO/Order/SearchTransactionOrder';
import { TransactionOrderDTO } from '../../../Shared/DTO/Order/TransactionOrderDTO';

export class SearchTransactionOrder {
    /*private _capture: CaptureOrder;
    private _cancel: CancelOrder;
    private _cardNumber: string;*/

    private constructor(private readonly _transaction: TransactionOrder) {}

    static createForDTO(searchTransactionDTO: SearchTransactionOrderDTO): SearchTransactionOrder {
        return SearchTransactionOrder.create(searchTransactionDTO.transaction);
    }

    static create(transactionDTO: TransactionOrderDTO) {
        const transaction = TransactionOrder.create(
            transactionDTO.numberRequest,
            transactionDTO.tid,
            transactionDTO.kind,
            transactionDTO.status,
            transactionDTO.amount,
            transactionDTO.message,
            transactionDTO.nsu,
            transactionDTO.authorizationCode,
            transactionDTO.installments,
        );
        const searchTransaction = new SearchTransactionOrder(transaction);

        return searchTransaction;
    }
}
