import { Mail } from '../../../../Adapter/Mail/Mail';
import { IMail } from '../../../../Shared/Interfaces/Mail/IMail';
import { ILogRepository } from '../../../../Shared/Interfaces/Repository/ILogRepository';
import { ITransactionRepository } from '../../../../Shared/Interfaces/Repository/ITransitionRepository';
import { GatewayMock } from '../../../../Adapter/Gateway/Mock/GatewayMock';
import { TransactionRepositoryMock } from '../../../../Adapter/Repository/Transaction/Mock/TransactionRepositoryMock';
import { LogRepositoryMock } from '../../../../Adapter/Repository/Log/Mock/LogRepositoryMock';
import { SearchTransactionDTO } from '../../../../Shared/DTO/SearchTransactionDTO';
import { SearchTransaction } from '../../../../Usecases/Transaction/SearchTransaction';

describe('UseCase - SearchTransaction', () => {
    let service: SearchTransaction;
    let repositoryTransaction: ITransactionRepository;
    let repositoryLog: ILogRepository;
    let mail: IMail;
    let searchTransactionDTO: SearchTransactionDTO;

    beforeEach(() => {
        const gateway = new GatewayMock();
        repositoryTransaction = new TransactionRepositoryMock();
        repositoryLog = new LogRepositoryMock();
        mail = new Mail();
        service = new SearchTransaction(gateway, repositoryLog);
        searchTransactionDTO = new SearchTransactionDTO();
        searchTransactionDTO.numberRequest = 'pedido123';
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
