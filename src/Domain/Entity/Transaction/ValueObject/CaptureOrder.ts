export class CaptureOrder {
    private constructor(
        private readonly _numberRequest: string,
        private readonly _amount: number,
        private readonly _date: Date,
        private readonly _nsu: string,
    ) {}

    get numberRequest(): string {
        return this._numberRequest;
    }
    get amount(): number {
        return this._amount;
    }
    get date(): Date {
        return this._date;
    }
    get nsu(): string {
        return this._nsu;
    }

    static create(numberRequest: string, amount: number, date: Date, nsu: string) {
        if (amount > 0) {
            if (!date) throw new Error('Campo date é obrigatório quando possui valor na captura');
            if (!nsu) throw new Error('Campo nsu é obrigatório quando possui valor na captura');
            if (!numberRequest) throw new Error('Campo numRequest é obrigatório quando possui valor na captura');
        }

        return new CaptureOrder(numberRequest, amount, date, nsu);
    }
}
