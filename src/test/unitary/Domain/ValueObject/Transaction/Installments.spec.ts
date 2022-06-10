import { Installments } from '../../../../../Domain/ValueObject/Transaction/Installments';

describe('Installments', () => {
    test('Should return error if installments in < 0', () => {
        expect(() => {
            new Installments(-5);
        }).toThrow();
    });

    test('Should return error if installments invalid ', () => {
        expect(() => {
            new Installments(24);
        }).toThrow();
    });

    test('Should object installments if installments correct ', () => {
        const installments = new Installments(5);

        expect(installments).toBeTruthy();
    });
});
