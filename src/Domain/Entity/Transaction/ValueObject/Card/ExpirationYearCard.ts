export class ExpirationYearCard {
    private constructor(private _expirationYear: number) {}

    static create(expirationYear: number) {
        const NUMBER_ZERO = 0;
        const YEAR_CARACTER = 4;

        if (expirationYear < NUMBER_ZERO) throw new Error('Deverá ser representado por números positivos');
        if (expirationYear.toFixed().length !== YEAR_CARACTER)
            throw new Error('ExpirationYear deverá ser escrito com ' + YEAR_CARACTER + ' digitos.');
        if (expirationYear < new Date().getFullYear() - 1) throw new Error('Não poderá ser inferior ao ano atual');

        return new ExpirationYearCard(expirationYear);
    }

    get expirationMonth(): number {
        return this._expirationYear;
    }
}
