import { SoftDescriptor } from '../../../../../Domain/ValueObject/Transaction/SoftDescriptor';

describe('SoftDescriptor', () => {
    test('Should return error if softDescriptor invalid', () => {
        expect(() => new SoftDescriptor('testetestetestetestetesteteste')).toThrow();
    });

    test('Should return error if softDescriptor is null', () => {
        expect(() => new SoftDescriptor('')).toThrow();
    });

    test('Should return object softDescriptor param valid', () => {
        const numberRequest = new SoftDescriptor('Compra_VALID');
        expect(numberRequest).toBeTruthy();
    });
});
