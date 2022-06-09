import { Mail } from '../../../../Infra/Mail/Mail';
import { IMail } from '../../../../Domain/Shared/Interfaces/Mail/IMail';
import { ILogRepository } from '../../../../Domain/Shared/Interfaces/Repository/ILogRepository';
import { ITransactionRepository } from '../../../../Domain/Shared/Interfaces/Repository/ITransitionRepository';
import { LogRepositoryMock } from '../../../Mock/Repository/LogRepositoryMock';
import { SearchTransactionDTOType } from '../../../../Domain/Shared/DTO/SearchTransactionDTOType';
import { SearchTransaction } from '../../../../Usecases/Transaction/SearchTransaction';
import { TransactionRepositoryMock } from '../../../Mock/Repository/TransactionRepositoryMock';
import { GatewayFake } from '../../../Mock/Gateway/Fake/GatewayFake';

describe('UseCase - SearchTransaction', () => {
    let service: SearchTransaction;
    let repositoryTransaction: ITransactionRepository;
    let repositoryLog: ILogRepository;
    let mail: IMail;
    let searchTransactionDTO: SearchTransactionDTOType;

    beforeEach(() => {
        const gateway = new GatewayFake();
        repositoryTransaction = new TransactionRepositoryMock();
        repositoryLog = new LogRepositoryMock();
        mail = new Mail();
        service = new SearchTransaction(gateway, repositoryLog);
        searchTransactionDTO = { numberRequest: 'pedido123' };
    });

    test('Should functions that are called', async () => {
        jest.spyOn(repositoryLog, 'register').mockImplementation();

        const resultado = await service.execute(searchTransactionDTO);

        expect(repositoryLog.register).toHaveBeenCalledTimes(1);
    });
    test('Should functions that are called', async () => {
        expect(1).toBe(1);
        const resultado = await service.execute(searchTransactionDTO);
        expect(resultado).toBeTruthy();
    });
});
