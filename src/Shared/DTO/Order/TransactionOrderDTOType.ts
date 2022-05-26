import { StatusTransaction } from '../../Enum/StatusTransaction';
import { TypeTransaction } from '../../Enum/TypeTransaction.enum';

export type TransactionOrderDTOType = {
    id?: string;
    numberRequest: string;
    tid: string;
    kind: TypeTransaction;
    status: StatusTransaction;
    amount: number;
    message: string;
    nsu?: string;
    authorizationCode?: string;
    installments?: number;
};
