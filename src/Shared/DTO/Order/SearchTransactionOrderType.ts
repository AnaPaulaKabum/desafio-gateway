import { TransactionOrderDTOType } from './TransactionOrderDTOType';

export type SearchTransactionOrderDTOType = {
    transaction: TransactionOrderDTOType;
    numberCreditCard: string;
    captureAmount?: number;
    captureDate?: Date;
    cancelAmount?: number;
    cancelDate?: Date;
};
