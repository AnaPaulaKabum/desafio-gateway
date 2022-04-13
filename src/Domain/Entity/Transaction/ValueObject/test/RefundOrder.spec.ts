import exp from 'constants';
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
        expect(transaction.amount).toBe(amount);
        expect(transaction.tid).toBe(tid);
        expect(transaction.nsu).toBe(nsu);
        expect(transaction.authorizationCode).toBe(authorizationCode);
    });
});
