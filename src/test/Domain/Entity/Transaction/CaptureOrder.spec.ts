import { CaptureOrder } from '../../../../Domain/Entity/Transaction/CaptureOrder';

type SutTypes = {
    numberRequest: string;
    amount: number;
    date: Date;
    nsu: string;
    authorizationCode: string;
};

const makeSut = (): SutTypes => {
    const numberRequest = '100';
    const amount = 100;
    const date = new Date();
    const nsu = '100';
    const authorizationCode = '123';

    return { numberRequest, amount, date, nsu, authorizationCode };
};

describe('CaptureOrder', () => {
    test('Should return error if nsu empty', () => {
        let { numberRequest, amount, date, nsu, authorizationCode } = makeSut();
        nsu = '';

        expect(() => {
            CaptureOrder.create(numberRequest, amount, date, nsu, authorizationCode);
        }).toThrow();
    });

    test('Should return error if numberRequest empty', () => {
        let { numberRequest, amount, date, nsu, authorizationCode } = makeSut();
        numberRequest = '';

        expect(() => {
            CaptureOrder.create(numberRequest, amount, date, nsu, authorizationCode);
        }).toThrow();
    });

    test('Should return error if date empty', () => {
        let { numberRequest, amount, nsu, authorizationCode } = makeSut();
        let dateEmpty: Date;

        expect(() => {
            CaptureOrder.create(numberRequest, amount, dateEmpty, nsu, authorizationCode);
        }).toThrow();
    });

    test('Should return error if authorizationCode empty', () => {
        let { numberRequest, amount, date, nsu, authorizationCode } = makeSut();
        authorizationCode = '';

        expect(() => {
            CaptureOrder.create(numberRequest, amount, date, nsu, authorizationCode);
        }).toThrow();
    });
    test('Should return not error if correct param', () => {
        let { numberRequest, amount, date, nsu, authorizationCode } = makeSut();
        const transaction = CaptureOrder.create(numberRequest, amount, date, nsu, authorizationCode);
        expect(transaction).toBeTruthy();
        expect(transaction).toBeInstanceOf(CaptureOrder);
    });

    test('Should get param correct', () => {
        let { numberRequest, amount, date, nsu, authorizationCode } = makeSut();
        const transaction = CaptureOrder.create(numberRequest, amount, date, nsu, authorizationCode);
        expect(transaction).toBeTruthy();
        expect(transaction.numberRequest).toBe(numberRequest);
        expect(transaction.amount).toBe(amount);
        expect(transaction.date).toBe(date);
        expect(transaction.nsu).toBe(nsu);
        expect(transaction.authorizationCode).toBe(authorizationCode);
    });
});
