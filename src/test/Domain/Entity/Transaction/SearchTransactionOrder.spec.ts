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

describe('Entity - SearchTransactionOrder', () => {
    test('Should return value if have param value', () => {
        let { transaction, creditCard } = makeSut();

        const transactionSearch = new SearchTransactionOrder(transaction, creditCard);

        expect(transactionSearch).toBeTruthy();
        expect(transactionSearch.numberCreditCard).toBe(creditCard);
    });
});
