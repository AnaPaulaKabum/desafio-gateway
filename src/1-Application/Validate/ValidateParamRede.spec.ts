import { TypeTransaction } from '../../5-Shared/Enum/TypeTransaction.enum';
import { ParamValidateType } from '../../5-Shared/Interfaces/Gateway/ParamValidateType';
import { TransactionRequest } from '../Request/TransactionRequest';
import { configRede } from './Rede';
import { ValidateParam } from './ValidateParam';

type SutTypes = { validateGateway: ParamValidateType; transactionSend: TransactionRequest };

const makeSut = (): SutTypes => {
    let validateGateway: ParamValidateType = {
        numberRequest_MAX: 16,
    };

    let transactionSend = new TransactionRequest(
        'pedido123',
        TypeTransaction.CREDIT,
        2099,
        2,
        'John Snow',
        '5448280000000007',
        1,
        2021,
        '123',
        'Compra na loja XXX',
    );
    return { validateGateway, transactionSend };
};

describe('isValidSend', () => {
    test('Should return error if numberRequest max_length', () => {
        let { validateGateway, transactionSend } = makeSut();
        transactionSend.numberRequest = '123456789123456789';
        expect(() => {
            ValidateParam.isValidSend(validateGateway, transactionSend);
        }).toThrow();
    });
});
