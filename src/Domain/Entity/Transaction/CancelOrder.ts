import { CancelOrderDTO } from '../../../Shared/DTO/Order/CancelOrderDTO';

export class CancelOrder {
    constructor(
        private readonly _numberRequest: string,
        private readonly _date: Date,
        private readonly _amount: number,
        private readonly _tid: string,
        private readonly _nsu: string,
        private readonly _authorizationCode: string,
    ) {
        if (!_numberRequest) throw new Error('Campo numberRequest é obrigatório');
        if (!_date) throw new Error('Campo date é obrigatório');
        if (!_tid) throw new Error('Campo tid é obrigatório');
        if (!_nsu) throw new Error('Campo nsu é obrigatório');
        if (!_authorizationCode) throw new Error('Campo authorizationCode é obrigatório');
    }

    get numberRequest(): string {
        return this._numberRequest;
    }
    get date(): Date {
        return this._date;
    }

    get amount(): number {
        return this._amount;
    }
    get tid(): string {
        return this._tid;
    }
    get nsu(): string {
        return this._nsu;
    }
    get authorizationCode(): string {
        return this._authorizationCode;
    }

    static createForDTO(cancelOrderDTO: CancelOrderDTO): CancelOrder {
        return new CancelOrder(
            cancelOrderDTO.numberRequest,
            cancelOrderDTO.date,
            cancelOrderDTO.amount,
            cancelOrderDTO.tid,
            cancelOrderDTO.nsu,
            cancelOrderDTO.authorizationCode,
        );
    }
}
