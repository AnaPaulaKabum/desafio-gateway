export class SoftDescriptor {
    private softDescriptor_MAX = 18;
    constructor(private _value: string) {
        if (!_value) throw new Error('SoftDescriptor é obrigatório');
        if (_value.length > this.softDescriptor_MAX) {
            throw new Error('SoftDescriptor deverá ter menos ' + this.softDescriptor_MAX + ' caracter');
        }
    }

    get value(): string {
        return this._value;
    }
}
