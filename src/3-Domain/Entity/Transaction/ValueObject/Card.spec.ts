import { TransactionRequest } from '../../../../1-Application/Request/TransactionRequest';
import { TypeTransaction } from '../../../../5-Shared/Enum/TypeTransaction.enum';

type SutTypes = { transactionSend: TransactionRequest };

const makeSut = (): SutTypes => {
    let transactionSend = new TransactionRequest(
        'pedido123',
        TypeTransaction.CREDIT,
        2099,
        2,
        'John',
        '5448280000000007',
        1,
        2025,
        '123',
        'LOJA XXX',
    );
    return { transactionSend };
};

describe('ValidateParamTransaction - isValidSend', () => {
    /* test('Should return error if expirationMonth negative', () => {
        let { transactionSend } = makeSut();
        transactionSend.expirationMonth = -2;
        expect(() => {
            ValidateParamTransaction.isValidSend(transactionSend);
        }).toThrow();
    });
    test('Should return error if expirationMonth invalid', () => {
        let { transactionSend } = makeSut();
        transactionSend.expirationMonth = 13;
        expect(() => {
            ValidateParamTransaction.isValidSend(transactionSend);
        }).toThrow();
    });

    test('Should return error if expirationYear negative', () => {
        let { transactionSend } = makeSut();
        transactionSend.expirationYear = -2022;
        expect(() => {
            ValidateParamTransaction.isValidSend(transactionSend);
        }).toThrow();
    });

    test('Should return error if expirationYear invalid', () => {
        let { transactionSend } = makeSut();
        transactionSend.expirationYear = 155;
        expect(() => {
            ValidateParamTransaction.isValidSend(transactionSend);
        }).toThrow();
    });

    test('Should return error if expirationYear invalid', () => {
        let { transactionSend } = makeSut();
        transactionSend.expirationYear = 2020;
        expect(() => {
            ValidateParamTransaction.isValidSend(transactionSend);
        }).toThrow();
    });

    test('Should return error if cardSecurityCode invalid', () => {
        let { transactionSend } = makeSut();
        transactionSend.cardSecurityCode = '12345';
        expect(() => {
            ValidateParamTransaction.isValidSend(transactionSend);
        }).toThrow();
    });

    test('Should return error if cardNumber invalid', () => {
        let { transactionSend } = makeSut();
        transactionSend.cardNumber = '012345678901234567890';
        expect(() => {
            ValidateParamTransaction.isValidSend(transactionSend);
        }).toThrow();
    });

    test('Should return not error if correct param ', () => {
        const { transactionSend } = makeSut();
        expect(ValidateParamTransaction.isValidSend(transactionSend)).toBeFalsy();
    });*/
});
