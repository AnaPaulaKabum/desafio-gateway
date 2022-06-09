import { CancelOrder } from '../../../Domain/Common/Transaction/CancelOrder';
import { CaptureOrder } from '../../../Domain/Common/Transaction/CaptureOrder';
import { TransactionOrder } from '../../../Domain/Common/Transaction/TransactionOrder';
import { TransactionOrderDTOType } from '../../DTO/Order/TransactionOrderDTOType';
import { StatusTransaction } from '../../Enum/StatusTransaction';

export interface ITransactionRepository {
    searchStatus(tid: string): Promise<StatusTransaction | null>;
    findOne(tid: string): Promise<TransactionOrderDTOType | null>;
    updateStatus(numberRequest: string, statusTransaction: StatusTransaction): Promise<any>;
    saveTransaction(transaction: TransactionOrder): Promise<any>;
    saveCapture(capture: CaptureOrder): Promise<any>;
    saveCancel(cancel: CancelOrder): Promise<any>;
}
