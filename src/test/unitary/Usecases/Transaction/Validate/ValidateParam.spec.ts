import { TypeTransaction } from '../../../../../Shared/Enum/TypeTransaction.enum';
import { ParamValidateType } from '../../../../../Shared/Interfaces/Gateway/ParamValidateType';
import { TransactionDTO } from '../../../../../Shared/DTO/TransactionDTO';
import { ValidateParam } from '../../../../../Usecases/Transaction/Validate/ValidateParam';

type SutTypes = { validateGateway: ParamValidateType; transactionSend: TransactionDTO };

const makeSut = (): SutTypes => {
    let validateGateway: ParamValidateType = {
        numberRequest_MAX: 16,
        installments_MIN: 2,
        installments_MAX: 12,
        cardholderName_MAX: 5,
        softDescriptor_MAX: 10,
        amount_MAX: 4,
    };

    let transactionSend = new TransactionDTO();
    transactionSend.numberRequest = 'pedido123';
    transactionSend.kind = TypeTransaction.CREDIT;
    transactionSend.amount = 2099;
    transactionSend.installments = 2;
    transactionSend.cardHolderName = 'John';
    transactionSend.cardNumber = '5448280000000007';
    transactionSend.expirationMonth = 1;
    transactionSend.expirationYear = 2025;
    transactionSend.cardSecurityCode = '123';
    transactionSend.softDescriptor = 'LOJA XX;';

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