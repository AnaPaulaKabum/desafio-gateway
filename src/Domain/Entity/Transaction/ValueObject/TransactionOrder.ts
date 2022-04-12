import { StatusTransaction } from '../../../../Shared/Enum/StatusTransaction';
import { TypeTransaction } from '../../../../Shared/Enum/TypeTransaction.enum';

export class TransactionOrder {
    private constructor(
        private readonly _numberRequest: string,
        private readonly _tid: string,
        private readonly _kind: TypeTransaction,
        private readonly _authorizationCode: string,
        private readonly _nsu: string,
        private readonly _status: StatusTransaction,
        private readonly _amount: number,
        private readonly _installments: number,
        private readonly _message: string,
    ) {}

    get numberRequest(): string {
        return this._numberRequest;
    }
    get tid(): string {
        return this._tid;
    }
    get kind(): TypeTransaction {
        return this._kind;
    }
    get authorizationCode(): string {
        return this._authorizationCode;
    }
    get nsu(): string {
        return this._nsu;
    }
    get status(): StatusTransaction {
        return this._status;
    }
    get amount(): number {
        return this._amount;
    }
    get installments(): number {
        return this._installments;
    }
    get message(): string {
        return this._message;
    }

    static create(
        numberRequest: string,
        tid: string,
        kind: TypeTransaction,
        authorizationCode: string,
        nsu: string,
        status: StatusTransaction,
        amount: number,
        installments: number,
        message: string,
    ): TransactionOrder {
        if (numberRequest === undefined) throw new Error('Campo numberRequest é obrigatório');

        if (tid === undefined) throw new Error('Campo tid é obrigatório');

        if (kind === undefined) throw new Error('Campo kind é obrigatório');

        if (authorizationCode === undefined) throw new Error('Campo authorizationCode é obrigatório');

        if (nsu === undefined) throw new Error('Campo nsu é obrigatório');

        if (status === undefined) throw new Error('Campo status é obrigatório');

        if (amount === undefined) throw new Error('Campo amount é obrigatório');

        if (installments === undefined) throw new Error('Campo installments é obrigatório');

        if (message === undefined) throw new Error('Campo message é obrigatório');

        return new TransactionOrder(
            numberRequest,
            tid,
            kind,
            authorizationCode,
            nsu,
            status,
            amount,
            installments,
            message,
        );
    }
}
