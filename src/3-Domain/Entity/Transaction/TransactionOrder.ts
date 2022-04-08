import { StatusTransaction } from '../../../5-Shared/Enum/StatusTransaction.js';
import { TypeTransaction } from '../../../5-Shared/Enum/TypeTransaction.enum.js';

export class TransactionOrder {
    numberRequest: string;
    tid: string;
    kind: TypeTransaction;
    authorizationCode: string;
    nsu: string;
    status: StatusTransaction;
    amount: number;
    installments: number;
    message: string;

    isValid() {
        if (this.numberRequest === undefined) throw new Error('Campo numberRequest é obrigatório');

        if (this.tid === undefined) throw new Error('Campo tid é obrigatório');

        if (this.kind === undefined) throw new Error('Campo kind é obrigatório');

        if (this.authorizationCode === undefined) throw new Error('Campo authorizationCode é obrigatório');

        if (this.nsu === undefined) throw new Error('Campo nsu é obrigatório');

        if (this.status === undefined) throw new Error('Campo status é obrigatório');

        if (this.amount === undefined) throw new Error('Campo amount é obrigatório');

        if (this.installments === undefined) throw new Error('Campo installments é obrigatório');

        if (this.message === undefined) throw new Error('Campo message é obrigatório');
    }
}
