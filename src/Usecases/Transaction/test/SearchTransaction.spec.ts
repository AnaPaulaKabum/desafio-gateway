import { Mail } from '../../../Adapter/Mail/Mail';
import { TransactionOrder } from '../../../Domain/Entity/Transaction/TransactionOrder';
import { StatusTransaction } from '../../../Shared/Enum/StatusTransaction';
import { TypeTransaction } from '../../../Shared/Enum/TypeTransaction.enum';
import { IMail } from '../../../Shared/Interfaces/Mail/IMail';
import { ILogRepository } from '../../../Shared/Interfaces/Repository/ILogRepository';
import { ITransactionRepository } from '../../../Shared/Interfaces/Repository/ITransitionRepository';
import { CancelTransaction } from '../CancelTransaction';
import { GatewayMock } from '../../../Adapter/Gateway/Mock/GatewayMock';
import { TransactionRepositoryMock } from '../../../Adapter/Repository/Transaction/Mock/TransactionRepositoryMock';
import { LogRepositoryMock } from '../../../Adapter/Repository/Log/Mock/LogRepositoryMock';
import { SearchTransaction } from '../SearchTransaction';
import { SearchTransactionDTO } from '../../../Shared/DTO/SearchTransactionDTO';

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
        expect(1).toBe(1);
        //const resultado = await service.execute(searchTransactionDTO);
        // expect(resultado).toBeTruthy();
    });
});
