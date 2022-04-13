import { RefundOrder } from '../RefundOrder';

type SutTypes = {
    numberRequest: string;
    date: Date;
    id: string;
    amount: number;
    tid: string;
    nsu: string;
    authorizationCode: string;
};

const makeSut = (): SutTypes => {
    const numberRequest = '100';
    const date = new Date();
    const id = '100';
    const amount = 100;
    const tid = '100';
    const nsu = '100';
    const authorizationCode = '100';

    return { numberRequest, date, id, amount, tid, nsu, authorizationCode };
};

describe('RefundOrder', () => {
    test('Should return error if numberRequest empty', () => {
        let { numberRequest, date, id, amount, tid, nsu, authorizationCode } = makeSut();
        numberRequest = '';

        expect(() => {
            RefundOrder.create(numberRequest, date, id, amount, tid, nsu, authorizationCode);
        }).toThrow();
    });

    test('Should return error if date empty', () => {
        let { numberRequest, date, id, amount, tid, nsu, authorizationCode } = makeSut();
        let dataEmpty: Date;

        expect(() => {
            RefundOrder.create(numberRequest, dataEmpty, id, amount, tid, nsu, authorizationCode);
        }).toThrow();
    });

    test('Should return error if id empty', () => {
        let { numberRequest, date, id, amount, tid, nsu, authorizationCode } = makeSut();
        id = '';

        expect(() => {
            RefundOrder.create(numberRequest, date, id, amount, tid, nsu, authorizationCode);
        }).toThrow();
    });

    test('Should return error if tid empty', () => {
        let { numberRequest, date, id, amount, tid, nsu, authorizationCode } = makeSut();
        tid = '';

        expect(() => {
            RefundOrder.create(numberRequest, date, id, amount, tid, nsu, authorizationCode);
        }).toThrow();
    });

    test('Should return error if nsu empty', () => {
        let { numberRequest, date, id, amount, tid, nsu, authorizationCode } = makeSut();
        nsu = '';

        expect(() => {
            RefundOrder.create(numberRequest, date, id, amount, tid, nsu, authorizationCode);
        }).toThrow();
    });

    test('Should return error if authorizationCode empty', () => {
        let { numberRequest, date, id, amount, tid, nsu, authorizationCode } = makeSut();
        authorizationCode = '';

        expect(() => {
            RefundOrder.create(numberRequest, date, id, amount, tid, nsu, authorizationCode);
        }).toThrow();
    });

    test('Should return not error if correct param', () => {
        let { numberRequest, date, id, amount, tid, nsu, authorizationCode } = makeSut();
        const transaction = RefundOrder.create(numberRequest, date, id, amount, tid, nsu, authorizationCode);
        expect(transaction).toBeTruthy();
        expect(transaction).toBeInstanceOf(RefundOrder);
    });

    test('Should return not error if get param ', () => {
        let { numberRequest, date, id, amount, tid, nsu, authorizationCode } = makeSut();
        const transaction = RefundOrder.create(numberRequest, date, id, amount, tid, nsu, authorizationCode);
        expect(transaction).toBeTruthy();
        expect(transaction.numberRequest).toBe(numberRequest);
        expect(transaction.date).toBe(date);
        expect(transaction.id).toBe(id);
        expect(transaction.amount).toBe(amount);
        expect(transaction.tid).toBe(tid);
        expect(transaction.nsu).toBe(nsu);
        expect(transaction.authorizationCode).toBe(authorizationCode);
    });
});
