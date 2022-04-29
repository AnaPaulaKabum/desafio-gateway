import { CancelOrder } from '../../../../Domain/Entity/Transaction/CancelOrder';

type SutTypes = {
    numberRequest: string;
    date: Date;
    amount: number;
    tid: string;
    nsu: string;
    authorizationCode: string;
};

const makeSut = (): SutTypes => {
    const numberRequest = '100';
    const date = new Date();
    const amount = 100;
    const tid = '100';
    const nsu = '100';
    const authorizationCode = '100';

    return { numberRequest, date, amount, tid, nsu, authorizationCode };
};

describe('Entity - CancelOrder', () => {
    test('Should return error if numberRequest empty', () => {
        let { numberRequest, date, amount, tid, nsu, authorizationCode } = makeSut();
        numberRequest = '';

        expect(() => {
            new CancelOrder(numberRequest, date, amount, tid, nsu, authorizationCode);
        }).toThrow();
    });

    test('Should return error if date empty', () => {
        let { numberRequest, amount, tid, nsu, authorizationCode } = makeSut();
        let dataEmpty: Date;

        expect(() => {
            new CancelOrder(numberRequest, dataEmpty, amount, tid, nsu, authorizationCode);
        }).toThrow();
    });

    test('Should return error if tid empty', () => {
        let { numberRequest, date, amount, tid, nsu, authorizationCode } = makeSut();
        tid = '';

        expect(() => {
            new CancelOrder(numberRequest, date, amount, tid, nsu, authorizationCode);
        }).toThrow();
    });

    test('Should return error if nsu empty', () => {
        let { numberRequest, date, amount, tid, nsu, authorizationCode } = makeSut();
        nsu = '';

        expect(() => {
            new CancelOrder(numberRequest, date, amount, tid, nsu, authorizationCode);
        }).toThrow();
    });

    test('Should return error if authorizationCode empty', () => {
        let { numberRequest, date, amount, tid, nsu, authorizationCode } = makeSut();
        authorizationCode = '';

        expect(() => {
            new CancelOrder(numberRequest, date, amount, tid, nsu, authorizationCode);
        }).toThrow();
    });

    test('Should return not error if correct param', () => {
        let { numberRequest, date, amount, tid, nsu, authorizationCode } = makeSut();
        const transaction = new CancelOrder(numberRequest, date, amount, tid, nsu, authorizationCode);
        expect(transaction).toBeTruthy();
        expect(transaction).toBeInstanceOf(CancelOrder);
    });

    test('Should return not error if get param ', () => {
        let { numberRequest, date, amount, tid, nsu, authorizationCode } = makeSut();
        const transaction = new CancelOrder(numberRequest, date, amount, tid, nsu, authorizationCode);
        expect(transaction).toBeTruthy();
        expect(transaction.numberRequest).toBe(numberRequest);
        expect(transaction.date).toBe(date);
        expect(transaction.amount).toBe(amount);
        expect(transaction.tid).toBe(tid);
        expect(transaction.nsu).toBe(nsu);
        expect(transaction.authorizationCode).toBe(authorizationCode);
    });
});
