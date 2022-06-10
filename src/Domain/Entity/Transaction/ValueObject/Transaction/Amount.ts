export class Amount {
    private amount_MAX = 10;

    constructor(private _value: string) {
        if (!_value) throw new Error('Amount deverá ser informado');
        if (_value.replace('.', '').length > this.amount_MAX) {
            throw new Error('Amount deverá ter menos ' + this.amount_MAX + ' caracteres');
        }
    }

    get value(): string {
        return this._value;
    }
}
