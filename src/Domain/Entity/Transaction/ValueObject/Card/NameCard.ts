export class NameCard {
    private constructor(private _name: string) {}

    static create(name: string) {
        const NAME_CARD_MAX = 45;

        if (!name) throw new Error('NameCard é obrigatório');
        if (name.length > NAME_CARD_MAX) throw new Error('NameCard deverá ter menos ' + NAME_CARD_MAX + ' caracteres');

        return new NameCard(name);
    }

    get name(): string {
        return this._name;
    }
}
