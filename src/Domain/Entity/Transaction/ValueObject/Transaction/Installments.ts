export class Installments {
    private installments_MIN = 2;
    private installments_MAX = 12;

    constructor(private _value: number) {
        if (_value < this.installments_MIN || _value > this.installments_MAX) {
            throw new Error(
                'Installments deverá possuir um número de ' + this.installments_MIN + ' até ' + this.installments_MAX,
            );
        }
    }
}
