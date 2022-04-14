import { CaptureOrder } from '../CaptureOrder';

type SutTypes = {
    numberRequest: string;
    amount: number;
    date: Date;
    nsu: string;
};

const makeSut = (): SutTypes => {
    const numberRequest = '100';
    const amount = 100;
    const date = new Date();
    const nsu = '100';

    return { numberRequest, amount, date, nsu };
};

describe('CaptureOrder', () => {
    test('Should return error if nsu empty', () => {
        let { numberRequest, amount, date, nsu } = makeSut();
        nsu = '';

        expect(() => {
            CaptureOrder.create(numberRequest, amount, date, nsu);
        }).toThrow();
    });

    test('Should return error if numberRequest empty', () => {
        let { numberRequest, amount, date, nsu } = makeSut();
        numberRequest = '';

        expect(() => {
            CaptureOrder.create(numberRequest, amount, date, nsu);
        }).toThrow();
    });

    test('Should return error if date empty', () => {
        let { numberRequest, amount, date, nsu } = makeSut();
        let dateEmpty: Date;

        expect(() => {
            CaptureOrder.create(numberRequest, amount, dateEmpty, nsu);
        }).toThrow();
    });
    test('Should return not error if correct param', () => {
        let { numberRequest, amount, date, nsu } = makeSut();
        const transaction = CaptureOrder.create(numberRequest, amount, date, nsu);
        expect(transaction).toBeTruthy();
        expect(transaction).toBeInstanceOf(CaptureOrder);
    });

    test('Should get param correct', () => {
        let { numberRequest, amount, date, nsu } = makeSut();
        const transaction = CaptureOrder.create(numberRequest, amount, date, nsu);
        expect(transaction).toBeTruthy();
        expect(transaction.numberRequest).toBe(numberRequest);
        expect(transaction.amount).toBe(amount);
        expect(transaction.date).toBe(date);
        expect(transaction.nsu).toBe(nsu);
    });
});