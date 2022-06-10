export class NumberRequest {
    private readonly numberRequest_MAX = 10;
    constructor(private _value: string) {
        if (!_value) {
            throw new Error('NumberRequest deverá possuir um valor');
        }
        if (_value.length > this.numberRequest_MAX) {
            throw new Error('NumberRequest deverá possuir até ' + this.numberRequest_MAX + ' caracter');
        }
    }

    get value(): string {
        return this._value;
    }
}
