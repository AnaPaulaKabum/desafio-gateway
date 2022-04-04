export class Card {
    number: string;
    brand: string;
    name: string;

    isValid() {
        if (this.number === undefined) throw new Error('Campo cardNumber é obrigatório');
        if (this.name === undefined) throw new Error('Campo cardName é obrigatório');
    }
}
