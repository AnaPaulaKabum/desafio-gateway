import { Mail } from '../../../Adapter/Mail/Mail';
import { IMail } from '../../../Shared/Interfaces/Mail/IMail';
import { ILogRepository } from '../../../Shared/Interfaces/Repository/ILogRepository';
import { ITransactionRepository } from '../../../Shared/Interfaces/Repository/ITransitionRepository';
import { CancelTransaction } from '../CancelTransaction';
import { GatewayMock } from './mock/GatewayMock';
import { LogRepositoryMock } from './mock/LogRepositoryMock';
import { TransactionRepositoryMock } from './mock/TransactionRepositoryMock';

describe('UseCase - CancelTransaction', () => {
    let service: CancelTransaction;
    let repositoryTransaction: ITransactionRepository;
    let repositoryLog: ILogRepository;
    let mail: IMail;
    let gateway;
    const numberRequest = 'pedido123';

    beforeEach(() => {
        gateway = new GatewayMock();
        repositoryTransaction = new TransactionRepositoryMock();
        repositoryLog = new LogRepositoryMock();
        mail = new Mail();
        service = new CancelTransaction(gateway, repositoryTransaction, repositoryLog, mail);
    });

    test('Should functions that are called', async () => {
        jest.spyOn(gateway, 'cancelTransaction').mockImplementation();
        jest.spyOn(repositoryTransaction, 'updateStatus').mockImplementation();
        jest.spyOn(repositoryTransaction, 'saveCancel').mockImplementation();
        jest.spyOn(repositoryLog, 'save').mockImplementation();

        await service.execute(numberRequest);

        expect(gateway.cancelTransaction).toHaveBeenCalledTimes(1);
        expect(repositoryTransaction.updateStatus).toHaveBeenCalledTimes(1);
        expect(repositoryTransaction.saveCancel).toHaveBeenCalledTimes(1);
        expect(repositoryLog.save).toHaveBeenCalledTimes(1);
    });

    test('Should return error when functions return error', async () => {
        jest.spyOn(repositoryTransaction, 'findOne').mockRejectedValueOnce(new Error());

        expect(service.execute(numberRequest)).rejects.toThrow();
    });
});
