export class HolderNameCard {
    private cardholderName_MAX = 30;
    constructor(private _value: string) {
        if (!_value.length) throw new Error('HolderNameCard é obrigatório');
        if (_value.length > this.cardholderName_MAX) {
            throw new Error('HolderNameCard deverá ter menos ' + this.cardholderName_MAX + ' caracter');
        }
    }

    get value(): string {
        return this._value;
    }
}
