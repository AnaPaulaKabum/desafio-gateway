import { Mail } from '../../../../Infra/Mail/Mail';
import { StatusTransaction } from '../../../../Domain/Shared/Enum/StatusTransaction';
import { TypeTransaction } from '../../../../Domain/Shared/Enum/TypeTransaction.enum';
import { IMail } from '../../../../Domain/Shared/Interfaces/Mail/IMail';
import { ILogRepository } from '../../../../Domain/Shared/Interfaces/Repository/ILogRepository';
import { ITransactionRepository } from '../../../../Domain/Shared/Interfaces/Repository/ITransitionRepository';
import { CancelTransaction } from '../../../../Usecases/Transaction/CancelTransaction';
import { GatewayFake } from '../../../Mock/Gateway/Fake/GatewayFake';
import { LogRepositoryMock } from '../../../Mock/Repository/LogRepositoryMock';
import { TransactionRepositoryMock } from '../../../Mock/Repository/TransactionRepositoryMock';

describe('UseCase - CancelTransaction', () => {
    let service: CancelTransaction;
    let repositoryTransaction: ITransactionRepository;
    let repositoryLog: ILogRepository;
    let mail: IMail;
    const cancelTransactionDTO = {
        tid: 'pedido123',
        amount: 100,
    };

    beforeEach(() => {
        const gateway = new GatewayFake();
        repositoryTransaction = new TransactionRepositoryMock();
        repositoryLog = new LogRepositoryMock();
        mail = new Mail();
        service = new CancelTransaction(gateway, repositoryTransaction, repositoryLog, mail);
    });

    test('Should functions that are called', async () => {
        jest.spyOn(repositoryTransaction, 'findOne').mockReturnValueOnce(
            new Promise(function (resolve) {
                resolve({
                    numberRequest: '100',
                    tid: '100',
                    kind: TypeTransaction.CREDIT,
                    status: StatusTransaction.NO_CAPTURE,
                    amount: 100,
                    message: 'Teste',
                    nsu: '100',
                    authorizationCode: '100',
                    installments: 1,
                });
            }),
        );
        jest.spyOn(repositoryTransaction, 'updateStatus').mockImplementation();
        jest.spyOn(repositoryTransaction, 'saveCancel').mockImplementation();
        jest.spyOn(repositoryLog, 'register').mockImplementation();

        await service.execute(cancelTransactionDTO);

        expect(repositoryTransaction.updateStatus).toHaveBeenCalledTimes(1);
        expect(repositoryTransaction.saveCancel).toHaveBeenCalledTimes(1);
        expect(repositoryLog.register).toHaveBeenCalledTimes(1);
    });

    test('Should return error when functions return error', async () => {
        jest.spyOn(repositoryTransaction, 'findOne').mockRejectedValueOnce(new Error());

        expect(service.execute(cancelTransactionDTO)).rejects.toThrow();
    });

    test('Should return error when findOne return transactionOrder with TypeTrasaction.FINNALY', async () => {
        jest.spyOn(repositoryTransaction, 'findOne').mockReturnValueOnce(
            new Promise(function (resolve) {
                resolve({
                    numberRequest: '100',
                    tid: '100',
                    kind: TypeTransaction.CREDIT,
                    status: StatusTransaction.NO_CAPTURE,
                    amount: 100,
                    message: 'Teste',
                    nsu: '100',
                    authorizationCode: '100',
                    installments: 1,
                });
            }),
        );

        expect(service.execute(cancelTransactionDTO)).rejects.toThrow();
    });
});
