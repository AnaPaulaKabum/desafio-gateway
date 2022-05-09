import { CancelOrder } from '../../../Domain/Entity/Transaction/CancelOrder';
import { CaptureOrder } from '../../../Domain/Entity/Transaction/CaptureOrder';
import { TransactionOrder } from '../../../Domain/Entity/Transaction/TransactionOrder';
import { StatusTransaction } from '../../Enum/StatusTransaction';

export interface ITransactionRepository {
    searchStatus(numberRequest: string): Promise<StatusTransaction>;
    findOne(tid: string): Promise<TransactionOrder>;
    updateStatus(numberRequest: string, statusTransaction: StatusTransaction): Promise<any>;
    saveTransaction(transaction: TransactionOrder): Promise<any>;
    saveCapture(capture: CaptureOrder): Promise<any>;
    saveCancel(cancel: CancelOrder): Promise<any>;
}
