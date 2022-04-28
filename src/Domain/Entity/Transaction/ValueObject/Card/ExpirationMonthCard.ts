export class ExpirationMonthCard {
    private constructor(private _expirationMonth: number) {}

    static create(expirationMonth: number) {
        const FIRST_MONTH = 1;
        const LAST_MONTH = 12;

        if (expirationMonth < FIRST_MONTH || expirationMonth > LAST_MONTH)
            throw new Error('Mes deverá ser representando por ' + FIRST_MONTH + ' a ' + LAST_MONTH);

        return new ExpirationMonthCard(expirationMonth);
    }

    public get(): number {
        return this._expirationMonth;
    }
}
