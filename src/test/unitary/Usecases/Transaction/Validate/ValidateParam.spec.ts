import { TypeTransaction } from '../../../../../Shared/Enum/TypeTransaction.enum';
import { ParamValidateType } from '../../../../../Shared/Interfaces/Gateway/ParamValidateType';
import { TransactionDTOType } from '../../../../../Shared/DTO/TransactionDTOType';
import { ValidateParam } from '../../../../../Usecases/Transaction/Validate/ValidateParam';

type SutTypes = { validateGateway: ParamValidateType; transactionSend: TransactionDTOType };

const makeSut = (): SutTypes => {
    let validateGateway: ParamValidateType = {
        numberRequest_MAX: 16,
        installments_MIN: 2,
        installments_MAX: 12,
        cardholderName_MAX: 5,
        softDescriptor_MAX: 10,
        amount_MAX: 4,
    };

    let transactionSend = {
        numberRequest: 'pedido123',
        kind: TypeTransaction.CREDIT,
        amount: 2099,
        installments: 2,
        cardHolderName: 'John',
        cardNumber: '5448280000000007',
        expirationMonth: 1,
        expirationYear: 2025,
        cardSecurityCode: '123',
        softDescriptor: 'LOJA XX;',
    };

    return { validateGateway, transactionSend };
};

describe('Validate Param- isValidSend', () => {
    test('Should return error if numberRequest > max_length', () => {
        let { validateGateway, transactionSend } = makeSut();
        transactionSend.numberRequest = '123456789123456789';
        expect(() => {
            ValidateParam.isValidSend(validateGateway, transactionSend);
        }).toThrow();
    });

    test('Should return error if installments in < 0', () => {
        let { validateGateway, transactionSend } = makeSut();
        transactionSend.installments = -5;
        expect(() => {
            ValidateParam.isValidSend(validateGateway, transactionSend);
        }).toThrow();
    });

    test('Should return error if installments invalid (installments_max +1)', () => {
        let { validateGateway, transactionSend } = makeSut();
        transactionSend.installments = validateGateway.numberRequest_MAX + 1;
        expect(() => {
            ValidateParam.isValidSend(validateGateway, transactionSend);
        }).toThrow();
    });

    test('Should return error if cardHolderName invalid', () => {
        let { validateGateway, transactionSend } = makeSut();
        transactionSend.cardHolderName = 'card_holder_invalid';
        expect(() => {
            ValidateParam.isValidSend(validateGateway, transactionSend);
        }).toThrow();
    });

    test('Should return error if softDescriptor invalid', () => {
        let { validateGateway, transactionSend } = makeSut();
        transactionSend.softDescriptor = 'soft_descriptr_invalid';
        expect(() => {
            ValidateParam.isValidSend(validateGateway, transactionSend);
        }).toThrow();
    });

    test('Should return error if amount invalid', () => {
        let { validateGateway, transactionSend } = makeSut();
        transactionSend.amount = 100.25;
        expect(() => {
            ValidateParam.isValidSend(validateGateway, transactionSend);
        }).toThrow();
    });

    test('Should return not error if correct param ', () => {
        const { validateGateway, transactionSend } = makeSut();
        expect(ValidateParam.isValidSend(validateGateway, transactionSend)).toBeFalsy();
    });
});
