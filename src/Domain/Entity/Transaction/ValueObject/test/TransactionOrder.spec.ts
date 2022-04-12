import { StatusTransaction } from '../../../../../Shared/Enum/StatusTransaction';
import { TypeTransaction } from '../../../../../Shared/Enum/TypeTransaction.enum';
import { TransactionOrder } from '../TransactionOrder';

type SutTypes = {
    numberRequest: string;
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
    const numberRequest = '100';
    const tid = '100';
    const kind = TypeTransaction.CREDIT;
    const authorizationCode = '100';
    const nsu = '100';
    const status = StatusTransaction.NO_CAPTURE;
    const amount = 100;
    const installments = 2;
    const message = 'Teste';
    return { numberRequest, tid, kind, authorizationCode, nsu, status, amount, installments, message };
};

describe('TransactionOrder', () => {
    test('Should return not error if correct param', () => {
        let { numberRequest, tid, kind, authorizationCode, nsu, status, amount, installments, message } = makeSut();
        const transaction = TransactionOrder.create(
            numberRequest,
            tid,
            kind,
            authorizationCode,
            nsu,
            status,
            amount,
            installments,
            message,
        );
        expect(transaction).toBeTruthy();
        expect(transaction).toBeInstanceOf(TransactionOrder);
    });
});
