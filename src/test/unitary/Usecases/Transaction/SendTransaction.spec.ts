import { Mail } from '../../../../Infra/Mail/Mail';
import { TransactionDTOType } from '../../../../Domain/Shared/DTO/TransactionDTOType';
import { StatusTransaction } from '../../../../Domain/Shared/Enum/StatusTransaction';
import { TypeTransaction } from '../../../../Domain/Shared/Enum/TypeTransaction.enum';
import { IMail } from '../../../../Domain/Shared/Interfaces/Mail/IMail';
import { ILogRepository } from '../../../../Domain/Shared/Interfaces/Repository/ILogRepository';
import { ITransactionRepository } from '../../../../Domain/Shared/Interfaces/Repository/ITransitionRepository';
import { LogRepositoryMock } from '../../../Mock/Repository/LogRepositoryMock';
import { SendTransaction } from '../../../../Usecases/Transaction/SendTransaction';
import { TransactionRepositoryMock } from '../../../Mock/Repository/TransactionRepositoryMock';
import { GatewayFake } from '../../../Mock/Gateway/Fake/GatewayFake';
import { configFake } from '../../../Mock/Gateway/Fake/configFake';

describe('UseCase - SendTransaction', () => {
    let service: SendTransaction;
    let transactionDTO: TransactionDTOType;
    let repositoryTransaction: ITransactionRepository;
    let repositoryLog: ILogRepository;
    let mail: IMail;

    beforeEach(() => {
        const gateway = new GatewayFake();
        repositoryTransaction = new TransactionRepositoryMock();
        repositoryLog = new LogRepositoryMock();
        mail = new Mail();
        service = new SendTransaction(gateway, repositoryTransaction, repositoryLog, mail);

        transactionDTO = {
            numberRequest: 'pedido123',
            kind: TypeTransaction.CREDIT,
            amount: '2099',
            installments: 2,
            cardHolderName: 'John Snow',
            cardNumber: '5448280000000007',
            expirationMonth: 1,
            expirationYear: 2021,
            cardSecurityCode: '123',
            softDescriptor: 'Compra na loja XXX',
        };
    });

    test('Should functions that are called by sendTransaction', async () => {
        jest.spyOn(repositoryTransaction, 'searchStatus').mockImplementation();
        jest.spyOn(repositoryTransaction, 'saveTransaction').mockImplementation();
        jest.spyOn(repositoryLog, 'register').mockImplementation();

        await service.execute(transactionDTO);

        expect(repositoryTransaction.searchStatus).toHaveBeenCalledTimes(1);
        expect(repositoryTransaction.saveTransaction).toHaveBeenCalledTimes(1);
        expect(repositoryLog.register).toHaveBeenCalledTimes(1);
    });

    test('Should return error when functions return error', async () => {
        jest.spyOn(repositoryTransaction, 'searchStatus').mockReturnValueOnce(
            new Promise(function (resolve) {
                resolve(StatusTransaction.FINNALY);
            }),
        );

        expect(service.execute(transactionDTO)).rejects.toThrow();
    });

    test('Should return error when functions return error', async () => {
        transactionDTO.installments = -1;
        expect(service.execute(transactionDTO)).rejects.toThrow();
    });
});
