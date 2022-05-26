import { TransactionOrderDTOType } from './TransactionOrderDTOType';

export class SearchTransactionOrderDTO {
    transaction: TransactionOrderDTOType;
    captureAmount: number;
    captureDate: Date;
    cancelAmount: number;
    cancelDate: Date;
    numberCreditCard: string;
}
