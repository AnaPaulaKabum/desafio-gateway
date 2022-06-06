import { TransactionOrderDTOType } from '../../../Shared/DTO/Order/TransactionOrderDTOType';
import { StatusTransaction } from '../../../Shared/Enum/StatusTransaction';
import { TypeTransaction } from '../../../Shared/Enum/TypeTransaction.enum';

export class TransactionOrder {
    public id?: string;
    constructor(
        private readonly _numberRequest: string,
        private readonly _tid: string,
        private readonly _kind: TypeTransaction,
        private readonly _status: StatusTransaction,
        private readonly _amount: number,
        private readonly _message: string,
        private readonly _nsu?: string,
        private readonly _authorizationCode?: string,
        private readonly _installments?: number,
    ) {
        if (!_numberRequest) throw new Error('Campo numberRequest é obrigatório');
        if (!_tid) throw new Error('Campo tid é obrigatório');
        if (!_kind) throw new Error('Campo kind é obrigatório');
        if (_kind === TypeTransaction.CREDIT) {
            if (!_nsu) throw new Error('Campo nsu é obrigatório');
            if (!_authorizationCode) throw new Error('Campo authorizationCode é obrigatório');
            if (!_installments) throw new Error('Campo installments é obrigatório');
        }
        if (!_status) throw new Error('Campo status é obrigatório');
        if (!_amount) throw new Error('Campo amount é obrigatório');
        if (!_message) throw new Error('Campo message é obrigatório');
    }

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

    static createForDTO(transactionDTO: TransactionOrderDTOType): TransactionOrder {
        return new TransactionOrder(
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
}
