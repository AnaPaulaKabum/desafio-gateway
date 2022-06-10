import { HolderNameCard } from '../../../../../Domain/Entity/Transaction/ValueObject/Card/HolderNameCard';

describe('HolderNameCard', () => {
    test('Should return error if cardHolderName invalid', () => {
        expect(() => new HolderNameCard('testetestetestetestetestetestetestetestetestetestetesteteste')).toThrow();
    });

    test('Should return error if cardHolderName is null', () => {
        expect(() => new HolderNameCard('')).toThrow();
    });

    test('Should return object softDescriptor param valid', () => {
        const numberRequest = new HolderNameCard('Nome_VALID');
        expect(numberRequest).toBeTruthy();
    });
});
