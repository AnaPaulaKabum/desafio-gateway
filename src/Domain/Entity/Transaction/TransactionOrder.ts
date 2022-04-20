import { TransactionOrderDTO } from '../../../Shared/DTO/Order/TransactionOrderDTO';
import { StatusTransaction } from '../../../Shared/Enum/StatusTransaction';
import { TypeTransaction } from '../../../Shared/Enum/TypeTransaction.enum';

export class TransactionOrder {
    private constructor(
        private readonly _numberRequest: string,
        private readonly _tid: string,
        private readonly _kind: TypeTransaction,
        private readonly _status: StatusTransaction,
        private readonly _amount: number,
        private readonly _message: string,
        private readonly _nsu?: string,
        private readonly _authorizationCode?: string,
        private readonly _installments?: number,
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
    get authorizationCode(): string | undefined {
        return this._authorizationCode;
    }
    get nsu(): string | undefined {
        return this._nsu;
    }
    get status(): StatusTransaction {
        return this._status;
    }
    get amount(): number {
        return this._amount;
    }
    get installments(): number | undefined {
        return this._installments;
    }
    get message(): string {
        return this._message;
    }

    static createForDTO(transactionDTO: TransactionOrderDTO): TransactionOrder {
        return TransactionOrder.create(
            transactionDTO.numberRequest,
            transactionDTO.tid,
            transactionDTO.kind,
            transactionDTO.status,
            transactionDTO.amount,
            transactionDTO.message,
            transactionDTO.nsu,
            transactionDTO.authorizationCode,
            transactionDTO.installments,
        );
    }

    static create(
        numberRequest: string,
        tid: string,
        kind: TypeTransaction,
        status: StatusTransaction,
        amount: number,
        message: string,
        nsu?: string,
        authorizationCode?: string,
        installments?: number,
    ): TransactionOrder {
        if (!numberRequest) throw new Error('Campo numberRequest é obrigatório');
        if (!tid) throw new Error('Campo tid é obrigatório');
        if (!kind) throw new Error('Campo kind é obrigatório');
        if (kind === TypeTransaction.CREDIT) {
            if (!nsu) throw new Error('Campo nsu é obrigatório');
            if (!authorizationCode) throw new Error('Campo authorizationCode é obrigatório');
            if (!installments) throw new Error('Campo installments é obrigatório');
        }
        if (!status) throw new Error('Campo status é obrigatório');
        if (!amount) throw new Error('Campo amount é obrigatório');
        if (!message) throw new Error('Campo message é obrigatório');

        return new TransactionOrder(
            numberRequest,
            tid,
            kind,
            status,
            amount,
            message,
            nsu,
            authorizationCode,
            installments,
        );
    }
}
