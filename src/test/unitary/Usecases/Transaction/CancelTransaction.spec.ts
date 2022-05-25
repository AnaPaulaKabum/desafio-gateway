import { Mail } from '../../../../Infra/Mail/Mail';
import { TransactionOrder } from '../../../../Domain/Entity/Transaction/TransactionOrder';
import { StatusTransaction } from '../../../../Shared/Enum/StatusTransaction';
import { TypeTransaction } from '../../../../Shared/Enum/TypeTransaction.enum';
import { IMail } from '../../../../Shared/Interfaces/Mail/IMail';
import { ILogRepository } from '../../../../Shared/Interfaces/Repository/ILogRepository';
import { ITransactionRepository } from '../../../../Shared/Interfaces/Repository/ITransitionRepository';
import { CancelTransaction } from '../../../../Usecases/Transaction/CancelTransaction';
import { GatewayMock } from '../../../Mock/Gateway/GatewayMock';
import { LogRepositoryMock } from '../../../Mock/Repository/LogRepositoryMock';
import { CancelTransactionDTO } from '../../../../Shared/DTO/CancelTransactionDTO';
import { TransactionRepositoryMock } from '../../../Mock/Repository/TransactionRepositoryMock';
import { TransactionOrderDTO } from '../../../../Shared/DTO/Order/TransactionOrderDTO';

describe('UseCase - CancelTransaction', () => {
    let service: CancelTransaction;
    let repositoryTransaction: ITransactionRepository;
    let repositoryLog: ILogRepository;
    let mail: IMail;
    const cancelTransactionDTO = new CancelTransactionDTO();
    cancelTransactionDTO.tid = 'pedido123';
    cancelTransactionDTO.amount = 100;

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
                const transactionOrderDTO = new TransactionOrderDTO();
                transactionOrderDTO.numberRequest = '100';
                transactionOrderDTO.tid = '100';
                transactionOrderDTO.kind = TypeTransaction.CREDIT;
                transactionOrderDTO.status = StatusTransaction.NO_CAPTURE;
                transactionOrderDTO.amount = 100;
                transactionOrderDTO.message = 'Teste';
                transactionOrderDTO.nsu = '100';
                transactionOrderDTO.authorizationCode = '100';
                transactionOrderDTO.installments = 1;
                resolve(transactionOrderDTO);
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
                const transactionOrderDTO = new TransactionOrderDTO();
                transactionOrderDTO.numberRequest = '100';
                transactionOrderDTO.tid = '100';
                transactionOrderDTO.kind = TypeTransaction.CREDIT;
                transactionOrderDTO.status = StatusTransaction.NO_CAPTURE;
                transactionOrderDTO.amount = 100;
                transactionOrderDTO.message = 'Teste';
                transactionOrderDTO.nsu = '100';
                transactionOrderDTO.authorizationCode = '100';
                transactionOrderDTO.installments = 1;
                resolve(transactionOrderDTO);
            }),
        );

        expect(service.execute(cancelTransactionDTO)).rejects.toThrow();
    });
});
