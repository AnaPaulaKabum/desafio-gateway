import { Amount } from '../../../../../Domain/ValueObject/Transaction/Amount';

describe('Amount', () => {
    test('Should return error if amount invalid', () => {
        expect(() => {
            new Amount('100000000000');
        }).toThrow();
    });

    test('Should return error if amount invalid', () => {
        expect(() => {
            new Amount('');
        }).toThrow();
    });

    test('Should return object Amount with param valid.', () => {
        const amount = new Amount('150.00');
        expect(amount).toBeTruthy();
    });
});
