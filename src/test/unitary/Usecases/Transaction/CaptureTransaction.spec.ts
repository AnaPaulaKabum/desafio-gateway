import { Mail } from '../../../../Infra/Mail/Mail';
import { CaptureTransactionDTOType } from '../../../../Shared/DTO/CaptureTransactionDTOType';
import { StatusTransaction } from '../../../../Shared/Enum/StatusTransaction';
import { IMail } from '../../../../Shared/Interfaces/Mail/IMail';
import { ILogRepository } from '../../../../Shared/Interfaces/Repository/ILogRepository';
import { ITransactionRepository } from '../../../../Shared/Interfaces/Repository/ITransitionRepository';
import { LogRepositoryMock } from '../../../Mock/Repository/LogRepositoryMock';
import { CaptureTransaction } from '../../../../Usecases/Transaction/CaptureTransaction';
import { TransactionRepositoryMock } from '../../../Mock/Repository/TransactionRepositoryMock';
import { GatewayFake } from '../../../Mock/Gateway/Fake/GatewayFake';

describe('UseCase - CaptureTransaction', () => {
    let service: CaptureTransaction;
    let repositoryTransaction: ITransactionRepository;
    let repositoryLog: ILogRepository;
    let mail: IMail;
    let gateway;
    let captureDTO: CaptureTransactionDTOType;

    beforeEach(() => {
        gateway = new GatewayFake();
        repositoryTransaction = new TransactionRepositoryMock();
        repositoryLog = new LogRepositoryMock();
        mail = new Mail();
        service = new CaptureTransaction(gateway, repositoryTransaction, repositoryLog, mail);

        captureDTO = {
            amount: 1000,
            tid: '8345000363484052380',
        };
    });

    test('Should functions that are called', async () => {
        jest.spyOn(repositoryTransaction, 'updateStatus').mockImplementation();
        jest.spyOn(repositoryTransaction, 'saveCapture').mockImplementation();
        jest.spyOn(repositoryLog, 'register').mockImplementation();
        jest.spyOn(repositoryTransaction, 'searchStatus').mockReturnValueOnce(
            new Promise(function (resolve) {
                resolve(StatusTransaction.NO_CAPTURE);
            }),
        );

        await service.execute(captureDTO);

        expect(repositoryTransaction.searchStatus).toHaveBeenCalledTimes(1);
        expect(repositoryTransaction.updateStatus).toHaveBeenCalledTimes(1);
        expect(repositoryTransaction.saveCapture).toHaveBeenCalledTimes(1);
        expect(repositoryLog.register).toHaveBeenCalledTimes(1);
    });

    test('Should return error when functions return error', async () => {
        jest.spyOn(repositoryTransaction, 'searchStatus').mockRejectedValueOnce(new Error());
        expect(service.execute(captureDTO)).rejects.toThrow();
    });

    test('Should return error when findOne return transactionOrder with TypeTrasaction.FINNALY', async () => {
        jest.spyOn(repositoryTransaction, 'searchStatus').mockReturnValueOnce(
            new Promise(function (resolve) {
                resolve(StatusTransaction.CAPTURE);
            }),
        );

        expect(service.execute(captureDTO)).rejects.toThrow();
    });
});
