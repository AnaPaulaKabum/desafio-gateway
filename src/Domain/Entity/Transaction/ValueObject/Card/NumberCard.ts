export class NumberCard {
    private constructor(private _number: string) {}

    static create(number: string) {
        const NUMBER_CARD_MAX = 19;
        if (number.length > NUMBER_CARD_MAX)
            throw new Error('CardNumber deverá ter menos ' + NUMBER_CARD_MAX + ' caracteres');

        return new NumberCard(number);
    }

    public get(): string {
        return this._number;
    }
}
