import { StatusTransaction } from '../../../../Shared/Enum/StatusTransaction';
import { TypeTransaction } from '../../../../Shared/Enum/TypeTransaction.enum';
import { TransactionOrder } from '../TransactionOrder';

type SutTypes = {
    number: string;
    tid: string;
    kind: TypeTransaction;
    authorizationCode: string;
    nsu: string;
    status: StatusTransaction;
    amount: number;
    installments: number;
    message: string;
};

const makeSut = (): SutTypes => {
    const number = '100';
    const tid = '100';
    const kind = TypeTransaction.CREDIT;
    const authorizationCode = '100';
    const nsu = '100';
    const status = StatusTransaction.NO_CAPTURE;
    const amount = 100;
    const installments = 2;
    const message = 'Teste';
    return { number, tid, kind, authorizationCode, nsu, status, amount, installments, message };
};

describe('TransactionOrder', () => {
    test('Should return error if numberRequest empty', () => {
        let { number, tid, kind, authorizationCode, nsu, status, amount, installments, message } = makeSut();

        number = '';
        expect(() => {
            TransactionOrder.create(number, tid, kind, status, amount, message, nsu, authorizationCode, installments);
        }).toThrow();
    });

    test('Should return error if tid empty', () => {
        let { number, tid, kind, authorizationCode, nsu, status, amount, installments, message } = makeSut();

        tid = '';
        expect(() => {
            TransactionOrder.create(number, tid, kind, status, amount, message, nsu, authorizationCode, installments);
        }).toThrow();
    });
    test('Should return error if tid empty', () => {
        let { number, tid, authorizationCode, nsu, status, amount, installments, message } = makeSut();

        let kindEmpty: TypeTransaction;

        expect(() => {
            TransactionOrder.create(
                number,
                tid,
                kindEmpty,
                status,
                amount,
                message,
                nsu,
                authorizationCode,
                installments,
            );
        }).toThrow();
    });

    test('Should return error if authorizationCode empty', () => {
        let { number, tid, kind, authorizationCode, nsu, status, amount, installments, message } = makeSut();

        authorizationCode = '';
        expect(() => {
            TransactionOrder.create(number, tid, kind, status, amount, message, nsu, authorizationCode, installments);
        }).toThrow();
    });

    test('Should return error if nsu empty', () => {
        let { number, tid, kind, authorizationCode, nsu, status, amount, installments, message } = makeSut();

        nsu = '';
        expect(() => {
            TransactionOrder.create(number, tid, kind, status, amount, message, nsu, authorizationCode, installments);
        }).toThrow();
    });

    test('Should return error if status empty', () => {
        let { number, tid, kind, authorizationCode, nsu, amount, installments, message } = makeSut();

        let status: StatusTransaction;
        expect(() => {
            TransactionOrder.create(number, tid, kind, status, amount, message, nsu, authorizationCode, installments);
        }).toThrow();
    });

    test('Should return error if amount 0', () => {
        let { number, tid, kind, authorizationCode, nsu, status, amount, installments, message } = makeSut();

        amount = 0;
        expect(() => {
            TransactionOrder.create(number, tid, kind, status, amount, message, nsu, authorizationCode, installments);
        }).toThrow();
    });

    test('Should return error if installments 0', () => {
        let { number, tid, kind, authorizationCode, nsu, status, amount, installments, message } = makeSut();

        installments = 0;
        expect(() => {
            TransactionOrder.create(number, tid, kind, status, amount, message, nsu, authorizationCode, installments);
        }).toThrow();
    });

    test('Should return error if message empty', () => {
        let { number, tid, kind, authorizationCode, nsu, status, amount, installments, message } = makeSut();

        message = '';
        expect(() => {
            TransactionOrder.create(number, tid, kind, status, amount, message, nsu, authorizationCode, installments);
        }).toThrow();
    });

    test('Should return not error if correct param', () => {
        let { number, tid, kind, authorizationCode, nsu, status, amount, installments, message } = makeSut();
        const transaction = TransactionOrder.create(
            number,
            tid,
            kind,
            status,
            amount,
            message,
            nsu,
            authorizationCode,
            installments,
        );
        expect(transaction).toBeTruthy();
        expect(transaction).toBeInstanceOf(TransactionOrder);
    });

    test('Should return not error if correct param', () => {
        let { number, tid, kind, authorizationCode, nsu, status, amount, installments, message } = makeSut();
        const transaction = TransactionOrder.create(
            number,
            tid,
            kind,
            status,
            amount,
            message,
            nsu,
            authorizationCode,
            installments,
        );
        expect(transaction).toBeTruthy();
        expect(transaction.numberRequest).toBe(number);
        expect(transaction.tid).toBe(tid);
        expect(transaction.kind).toBe(kind);
        expect(transaction.authorizationCode).toBe(authorizationCode);
        expect(transaction.nsu).toBe(nsu);
        expect(transaction.status).toBe(status);
        expect(transaction.amount).toBe(amount);
        expect(transaction.installments).toBe(installments);
        expect(transaction.message).toBe(message);
    });
});
