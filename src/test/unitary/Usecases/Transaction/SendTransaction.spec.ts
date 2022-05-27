import { Mail } from '../../../../Infra/Mail/Mail';
import { TransactionDTOType } from '../../../../Shared/DTO/TransactionDTOType';
import { StatusTransaction } from '../../../../Shared/Enum/StatusTransaction';
import { TypeTransaction } from '../../../../Shared/Enum/TypeTransaction.enum';
import { IMail } from '../../../../Shared/Interfaces/Mail/IMail';
import { ILogRepository } from '../../../../Shared/Interfaces/Repository/ILogRepository';
import { ITransactionRepository } from '../../../../Shared/Interfaces/Repository/ITransitionRepository';
import { GatewayMock } from '../../../Mock/Gateway/GatewayMock';
import { LogRepositoryMock } from '../../../Mock/Repository/LogRepositoryMock';
import { configMock } from '../../../Mock/Gateway/configMock';
import { SendTransaction } from '../../../../Usecases/Transaction/SendTransaction';
import { TransactionRepositoryMock } from '../../../Mock/Repository/TransactionRepositoryMock';

describe('UseCase - SendTransaction', () => {
    let service: SendTransaction;
    let transactionDTO: TransactionDTOType;
    let repositoryTransaction: ITransactionRepository;
    let repositoryLog: ILogRepository;
    let mail: IMail;

    beforeEach(() => {
        const gateway = new GatewayMock();
        repositoryTransaction = new TransactionRepositoryMock();
        repositoryLog = new LogRepositoryMock();
        mail = new Mail();
        service = new SendTransaction(gateway, configMock(), repositoryTransaction, repositoryLog, mail);

        transactionDTO = {
            numberRequest: 'pedido123',
            kind: TypeTransaction.CREDIT,
            amount: 2099,
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
