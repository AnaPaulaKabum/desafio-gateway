import { NumberRequest } from '../../../../../Domain/ValueObject/Transaction/NumberRequest';

describe('NumberRequest- isValidSend', () => {
    test('Should return error if numberRequest > max_length', () => {
        expect(() => new NumberRequest('1234567890123456789')).toThrow();
    });
    test('Should return error if numberRequest is null', () => {
        expect(() => new NumberRequest('')).toThrow();
    });

    test('Should return object NumberRequest if numberRequest < max_length', () => {
        const numberRequest = new Number('123456');
        expect(numberRequest).toBeTruthy();
    });
});
