import { CancelOrder } from '../../../Domain/Entity/Transaction/CancelOrder';
import { CaptureOrder } from '../../../Domain/Entity/Transaction/CaptureOrder';
import { TransactionOrder } from '../../../Domain/Entity/Transaction/TransactionOrder';
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
