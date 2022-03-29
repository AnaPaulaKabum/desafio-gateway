import { StatusTransaction } from '../../Core/Interfaces/Transaction/Enum/StatusTransaction.js';
import { TypeTransaction } from '../../Core/Interfaces/Transaction/Enum/TypeTransaction.enum.js';

export class Transaction {
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
        if (!this.numberRequest) {
            throw new Error('Campo numberRequest é obrigatório');
        }
        if (!this.tid) {
            throw new Error('Campo tid é obrigatório');
        }
        if (!this.kind) {
            throw new Error('Campo kind é obrigatório');
        }
        if (!this.authorizationCode) {
            throw new Error('Campo authorizationCode é obrigatório');
        }
        if (!this.nsu) {
            throw new Error('Campo nsu é obrigatório');
        }
        if (!this.status) {
            throw new Error('Campo status é obrigatório');
        }
        if (!this.amount) {
            throw new Error('Campo amount é obrigatório');
        }
        if (!this.installments) {
            throw new Error('Campo installments é obrigatório');
        }
        if (!this.message) {
            throw new Error('Campo message é obrigatório');
        }
    }
}
