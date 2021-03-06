import { CancelOrder } from '../../../../../Domain/Common/Transaction/CancelOrder';
import { CaptureOrder } from '../../../../../Domain/Common/Transaction/CaptureOrder';
import { SearchTransactionOrder } from '../../../../../Domain/Common/Transaction/SearchTransactionOrder';
import { TransactionOrder } from '../../../../../Domain/Common/Transaction/TransactionOrder';
import { StatusTransaction } from '../../../../../Domain/Shared/Enum/StatusTransaction';
import { TypeTransaction } from '../../../../../Domain/Shared/Enum/TypeTransaction.enum';

type SutTypes = {
    transaction: TransactionOrder;
    creditCard: string;
    capture: CaptureOrder;
    cancel: CancelOrder;
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
    const transaction = new TransactionOrder(
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

    const creditCard = '123456789';

    const date = new Date();
    const capture = new CaptureOrder(number, amount, date, nsu, authorizationCode);
    const cancel = new CancelOrder(number, date, amount, tid, nsu, authorizationCode);

    return { transaction, creditCard, capture, cancel };
};

describe('Entity - SearchTransactionOrder', () => {
    test('Should return error if amountCancel value negative', () => {
        let { transaction, creditCard } = makeSut();

        const serachTransactionOrder = new SearchTransactionOrder(transaction, creditCard);
        expect(() => {
            serachTransactionOrder.setCancel(-100, new Date());
        }).toThrow();
    });
    test('Should return error if amountCancel value zero', () => {
        let { transaction, creditCard } = makeSut();

        const serachTransactionOrder = new SearchTransactionOrder(transaction, creditCard);
        expect(() => {
            serachTransactionOrder.setCancel(0, new Date());
        }).toThrow();
    });
    test('Should return error if amountCaptura value negative', () => {
        let { transaction, creditCard } = makeSut();

        const serachTransactionOrder = new SearchTransactionOrder(transaction, creditCard);
        expect(() => {
            serachTransactionOrder.setCapturar(-100, new Date());
        }).toThrow();
    });
    test('Should return error if amountCaptura value zero', () => {
        let { transaction, creditCard } = makeSut();

        const serachTransactionOrder = new SearchTransactionOrder(transaction, creditCard);
        expect(() => {
            serachTransactionOrder.setCapturar(0, new Date());
        }).toThrow();
    });
    test('Should return error if not have creditCard', () => {
        let { transaction } = makeSut();

        expect(() => {
            new SearchTransactionOrder(transaction, '');
        }).toThrow();
    });
    test('Should return value if have param value with captura', () => {
        let { transaction, creditCard } = makeSut();
        const amount = 150;
        const date = new Date();
        const transactionSearch = new SearchTransactionOrder(transaction, creditCard);

        transactionSearch.setCapturar(amount, date);

        expect(transactionSearch).toBeTruthy();
        expect(transactionSearch.captureAmount).toBe(amount);
        expect(transactionSearch.captureDate).toBe(date);
    });
    test('Should return value if have param value with cancel', () => {
        const { transaction, creditCard } = makeSut();
        const amount = 1000;
        const date = new Date();
        const transactionSearch = new SearchTransactionOrder(transaction, creditCard);

        transactionSearch.setCancel(amount, date);

        expect(transactionSearch).toBeTruthy();
        expect(transactionSearch.cancelAmount).toBe(amount);
        expect(transactionSearch.cancelDate).toBe(date);
    });
    test('Should return value if have param value', () => {
        let { transaction, creditCard } = makeSut();

        const transactionSearch = new SearchTransactionOrder(transaction, creditCard);

        expect(transactionSearch).toBeTruthy();
        expect(transactionSearch.numberCreditCard).toBe(creditCard);
    });
});
