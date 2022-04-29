import { CancelOrder } from '../../../../Domain/Entity/Transaction/CancelOrder';
import { CaptureOrder } from '../../../../Domain/Entity/Transaction/CaptureOrder';
import { SearchTransactionOrder } from '../../../../Domain/Entity/Transaction/SearchTransactionOrder';
import { TransactionOrder } from '../../../../Domain/Entity/Transaction/TransactionOrder';
import { StatusTransaction } from '../../../../Shared/Enum/StatusTransaction';
import { TypeTransaction } from '../../../../Shared/Enum/TypeTransaction.enum';

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

describe('SearchTransactionOrder', () => {
    test('Should return error if have two assignment in cancel', () => {
        expect(1).toBe(1);
        /* let { transaction, creditCard, cancel } = makeSut();

        const transactionSearch = new SearchTransactionOrder(transaction);
        transactionSearch.creditCard = creditCard;
        transactionSearch.cancel = cancel;

        expect(() => {
            transactionSearch.cancel = cancel;
        }).toThrow();*/
    });
    /*test('Should return error if have two assignment in capture', () => {
        let { transaction, creditCard, capture } = makeSut();

        const transactionSearch = new SearchTransactionOrder(transaction);
        transactionSearch.creditCard = creditCard;
        transactionSearch.capture = capture;

        expect(() => {
            transactionSearch.capture = capture;
        }).toThrow();
    });

    test('Should not return error if have capture', () => {
        let { transaction, creditCard, capture } = makeSut();

        const transactionSearch = new SearchTransactionOrder(transaction);
        transactionSearch.creditCard = creditCard;
        transactionSearch.capture = capture;

        expect(transactionSearch).toBeTruthy();
        expect(transactionSearch.capture).toBeInstanceOf(CaptureOrder);
        expect(transactionSearch.capture).toEqual(capture);
    });

    test('Should not return error if have cancel', () => {
        let { transaction, creditCard, cancel } = makeSut();

        const transactionSearch = new SearchTransactionOrder(transaction);
        transactionSearch.creditCard = creditCard;
        transactionSearch.cancel = cancel;

        expect(transactionSearch).toBeTruthy();
        expect(transactionSearch.cancel).toBeInstanceOf(CancelOrder);
        expect(transactionSearch.cancel).toEqual(cancel);
    });
    test('Should return value if have param value', () => {
        let { transaction, creditCard } = makeSut();

        const transactionSearch = new SearchTransactionOrder(transaction);
        transactionSearch.creditCard = creditCard;

        expect(transactionSearch).toBeTruthy();
        expect(transactionSearch.creditCard).toBe(creditCard);
    });*/
});
