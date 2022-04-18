export class CancelOrder {
    private constructor(
        private readonly _numberRequest: string,
        private readonly _date: Date,
        private readonly _amount: number,
        private readonly _tid: string,
        private readonly _nsu: string,
        private readonly _authorizationCode: string,
    ) {}

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

    static create(
        numberRequest: string,
        date: Date,
        amount: number,
        tid: string,
        nsu: string,
        authorizationCode: string,
    ): CancelOrder {
        if (!numberRequest) throw new Error('Campo numberRequest é obrigatório');
        if (!date) throw new Error('Campo date é obrigatório');
        if (!tid) throw new Error('Campo tid é obrigatório');
        if (!nsu) throw new Error('Campo nsu é obrigatório');
        if (!authorizationCode) throw new Error('Campo authorizationCode é obrigatório');

        return new CancelOrder(numberRequest, date, amount, tid, nsu, authorizationCode);
    }
}
