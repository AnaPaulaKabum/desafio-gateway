import { Card } from './Card';

type SutTypes = {
    number: string;
    name: string;
    expirationMonth: number;
    expirationYear: number;
    securityCode: string;
};

const makeSut = (): SutTypes => {
    const number = '455187******0183';
    const name = ' Teste';
    const expirationMonth = 10;
    const expirationYear = 2028;
    const securityCode = '123';
    return { number, name, expirationMonth, expirationYear, securityCode };
};

describe('Card - Validation', () => {
    test('Should return error if expirationMonth negative', () => {
        let { number, name, expirationMonth, expirationYear, securityCode } = makeSut();
        expirationMonth = -3;

        expect(() => {
            Card.create(number, name, expirationMonth, expirationYear, securityCode);
        }).toThrow();
    });
    test('Should return error if expirationMonth invalid', () => {
        let { number, name, expirationMonth, expirationYear, securityCode } = makeSut();
        expirationMonth = 13;
        expect(() => {
            Card.create(number, name, expirationMonth, expirationYear, securityCode);
        }).toThrow();
    });

    test('Should return error if expirationYear negative', () => {
        let { number, name, expirationMonth, expirationYear, securityCode } = makeSut();
        expirationYear = -2022;
        expect(() => {
            Card.create(number, name, expirationMonth, expirationYear, securityCode);
        }).toThrow();
    });

    test('Should return error if expirationYear invalid', () => {
        let { number, name, expirationMonth, expirationYear, securityCode } = makeSut();
        expirationYear = 155;
        expect(() => {
            Card.create(number, name, expirationMonth, expirationYear, securityCode);
        }).toThrow();
    });

    test('Should return error if cardSecurityCode invalid', () => {
        let { number, name, expirationMonth, expirationYear, securityCode } = makeSut();
        securityCode = '12345';
        expect(() => {
            Card.create(number, name, expirationMonth, expirationYear, securityCode);
        }).toThrow();
    });

    test('Should return error if cardNumber invalid', () => {
        let { number, name, expirationMonth, expirationYear, securityCode } = makeSut();
        securityCode = '012345678901234567890';
        expect(() => {
            Card.create(number, name, expirationMonth, expirationYear, securityCode);
        }).toThrow();
    });

    test('Should return not error if correct param ', () => {
        let { number, name, expirationMonth, expirationYear, securityCode } = makeSut();
        const card = Card.create(number, name, expirationMonth, expirationYear, securityCode);
        expect(card).toBeTruthy();
        expect(card).toBeInstanceOf(Card);
    });
});
