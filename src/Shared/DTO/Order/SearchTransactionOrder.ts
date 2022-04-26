import { TransactionOrderDTO } from './TransactionOrderDTO';

export class SearchTransactionOrderDTO {
    transaction: TransactionOrderDTO;
    captureAmount: number;
    captureDate: Date;
    cancelAmount: number;
    cancelDate: Date;
    numberCreditCard: string;
}
