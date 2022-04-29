import { Mail } from '../../../Adapter/Mail/Mail';
import { TransactionOrder } from '../../../Domain/Entity/Transaction/TransactionOrder';
import { StatusTransaction } from '../../../Shared/Enum/StatusTransaction';
import { TypeTransaction } from '../../../Shared/Enum/TypeTransaction.enum';
import { IMail } from '../../../Shared/Interfaces/Mail/IMail';
import { ILogRepository } from '../../../Shared/Interfaces/Repository/ILogRepository';
import { ITransactionRepository } from '../../../Shared/Interfaces/Repository/ITransitionRepository';
import { CancelTransaction } from '../../../Usecases/Transaction/CancelTransaction';
import { GatewayMock } from '../../../Adapter/Gateway/Mock/GatewayMock';
import { TransactionRepositoryMock } from '../../../Adapter/Repository/Transaction/Mock/TransactionRepositoryMock';
import { LogRepositoryMock } from '../../../Adapter/Repository/Log/Mock/LogRepositoryMock';

describe('UseCase - CancelTransaction', () => {
    let service: CancelTransaction;
    let repositoryTransaction: ITransactionRepository;
    let repositoryLog: ILogRepository;
    let mail: IMail;
    const numberRequest = 'pedido123';

    beforeEach(() => {
        const gateway = new GatewayMock();
        repositoryTransaction = new TransactionRepositoryMock();
        repositoryLog = new LogRepositoryMock();
        mail = new Mail();
        service = new CancelTransaction(gateway, repositoryTransaction, repositoryLog, mail);
    });

    test('Should functions that are called', async () => {
        jest.spyOn(repositoryTransaction, 'findOne').mockReturnValueOnce(
            new Promise(function (resolve) {
                resolve(
                    new TransactionOrder(
                        numberRequest,
                        '100',
                        TypeTransaction.CREDIT,
                        StatusTransaction.CAPTURE,
                        100,
                        'Teste',
                        '100',
                        '100',
                        1,
                    ),
                );
            }),
        );
        jest.spyOn(repositoryTransaction, 'updateStatus').mockImplementation();
        jest.spyOn(repositoryTransaction, 'saveCancel').mockImplementation();
        jest.spyOn(repositoryLog, 'save').mockImplementation();

        await service.execute(numberRequest);

        expect(repositoryTransaction.updateStatus).toHaveBeenCalledTimes(1);
        expect(repositoryTransaction.saveCancel).toHaveBeenCalledTimes(1);
        expect(repositoryLog.save).toHaveBeenCalledTimes(1);
    });

    test('Should return error when functions return error', async () => {
        jest.spyOn(repositoryTransaction, 'findOne').mockRejectedValueOnce(new Error());

        expect(service.execute(numberRequest)).rejects.toThrow();
    });

    test('Should return error when findOne return transactionOrder with TypeTrasaction.FINNALY', async () => {
        jest.spyOn(repositoryTransaction, 'findOne').mockReturnValueOnce(
            new Promise(function (resolve) {
                resolve(
                    new TransactionOrder(
                        numberRequest,
                        '100',
                        TypeTransaction.CREDIT,
                        StatusTransaction.FINNALY,
                        100,
                        'Teste',
                        '100',
                        '100',
                        1,
                    ),
                );
            }),
        );

        expect(service.execute(numberRequest)).rejects.toThrow();
    });
});
