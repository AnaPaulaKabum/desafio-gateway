import { Mail } from '../../../Adapter/Mail/Mail';
import { CaptureTransactionDTO } from '../../../Shared/DTO/CaptureTransactionDTO';
import { StatusTransaction } from '../../../Shared/Enum/StatusTransaction';
import { IMail } from '../../../Shared/Interfaces/Mail/IMail';
import { ILogRepository } from '../../../Shared/Interfaces/Repository/ILogRepository';
import { ITransactionRepository } from '../../../Shared/Interfaces/Repository/ITransitionRepository';
import { CaptureTransaction } from '../CaptureTransaction';
import { GatewayMock } from './mock/GatewayMock';
import { LogRepositoryMock } from './mock/LogRepositoryMock';
import { TransactionRepositoryMock } from './mock/TransactionRepositoryMock';

describe('UseCase - CaptureTransaction', () => {
    let service: CaptureTransaction;
    let repositoryTransaction: ITransactionRepository;
    let repositoryLog: ILogRepository;
    let mail: IMail;
    let gateway;
    let captureDTO: CaptureTransactionDTO;

    beforeEach(() => {
        gateway = new GatewayMock();
        repositoryTransaction = new TransactionRepositoryMock();
        repositoryLog = new LogRepositoryMock();
        mail = new Mail();
        service = new CaptureTransaction(gateway, repositoryTransaction, repositoryLog, mail);

        captureDTO = new CaptureTransactionDTO();
        captureDTO.amount = 1000;
        captureDTO.numberRequest = 'pedido123';
    });

    test('Should functions that are called', async () => {
        jest.spyOn(gateway, 'captureTransaction').mockImplementation();
        jest.spyOn(repositoryTransaction, 'updateStatus').mockImplementation();
        jest.spyOn(repositoryTransaction, 'saveCapture').mockImplementation();
        jest.spyOn(repositoryLog, 'save').mockImplementation();

        await service.execute(captureDTO);

        expect(gateway.captureTransaction).toHaveBeenCalledTimes(1);
        expect(repositoryTransaction.updateStatus).toHaveBeenCalledTimes(1);
        expect(repositoryTransaction.saveCapture).toHaveBeenCalledTimes(1);
        expect(repositoryLog.save).toHaveBeenCalledTimes(1);
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
