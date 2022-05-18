import { Mail } from '../../../../Infra/Mail/Mail';
import { IMail } from '../../../../Shared/Interfaces/Mail/IMail';
import { ILogRepository } from '../../../../Shared/Interfaces/Repository/ILogRepository';
import { ITransactionRepository } from '../../../../Shared/Interfaces/Repository/ITransitionRepository';
import { GatewayMock } from '../../../Mock/Gateway/GatewayMock';
import { LogRepositoryMock } from '../../../Mock/Repository/LogRepositoryMock';
import { SearchTransactionDTO } from '../../../../Shared/DTO/SearchTransactionDTO';
import { SearchTransaction } from '../../../../Usecases/Transaction/SearchTransaction';
import { TransactionRepositoryMock } from '../../../Mock/Repository/TransactionRepositoryMock';

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
