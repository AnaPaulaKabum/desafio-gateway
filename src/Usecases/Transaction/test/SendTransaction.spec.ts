import { Mail } from '../../../Adapter/Mail/Mail';
import { TransactionDTO } from '../../../Shared/DTO/TransactionDTO';
import { StatusTransaction } from '../../../Shared/Enum/StatusTransaction';
import { TypeTransaction } from '../../../Shared/Enum/TypeTransaction.enum';
import { IMail } from '../../../Shared/Interfaces/Mail/IMail';
import { ILogRepository } from '../../../Shared/Interfaces/Repository/ILogRepository';
import { ITransactionRepository } from '../../../Shared/Interfaces/Repository/ITransitionRepository';
import { SendTransaction } from '../SendTransaction';
import { configMock } from './mock/configMock';
import { GatewayMock } from './mock/GatewayMock';
import { LogRepositoryMock } from './mock/LogRepositoryMock';
import { TransactionRepositoryMock } from './mock/TransactionRepositoryMock';

describe('UseCase - SendTransaction', () => {
    let service: SendTransaction;
    let transactionDTO: TransactionDTO;
    let repositoryTransaction: ITransactionRepository;
    let repositoryLog: ILogRepository;
    let mail: IMail;

    beforeEach(() => {
        const gateway = new GatewayMock();
        repositoryTransaction = new TransactionRepositoryMock();
        repositoryLog = new LogRepositoryMock();
        mail = new Mail();
        service = new SendTransaction(gateway, configMock(), repositoryTransaction, repositoryLog, mail);

        transactionDTO = new TransactionDTO();
        transactionDTO.numberRequest = 'pedido123';
        transactionDTO.kind = TypeTransaction.CREDIT;
        transactionDTO.amount = 2099;
        transactionDTO.installments = 2;
        transactionDTO.cardHolderName = 'John Snow';
        transactionDTO.cardNumber = '5448280000000007';
        transactionDTO.expirationMonth = 1;
        transactionDTO.expirationYear = 2021;
        transactionDTO.cardSecurityCode = '123';
        transactionDTO.softDescriptor = 'Compra na loja XXX';
    });

    test('Should functions that are called by sendTransaction', async () => {
        jest.spyOn(repositoryTransaction, 'searchStatus').mockImplementation();
        jest.spyOn(repositoryTransaction, 'saveTransaction').mockImplementation();
        jest.spyOn(repositoryLog, 'save').mockImplementation();

        await service.execute(transactionDTO);

        expect(repositoryTransaction.searchStatus).toHaveBeenCalledTimes(1);
        expect(repositoryTransaction.saveTransaction).toHaveBeenCalledTimes(1);
        expect(repositoryLog.save).toHaveBeenCalledTimes(1);
    });

    test('Should return error when functions return error', async () => {
        jest.spyOn(repositoryTransaction, 'searchStatus').mockReturnValueOnce(
            new Promise(function (resolve) {
                resolve(StatusTransaction.FINNALY);
            }),
        );

        expect(service.execute(transactionDTO)).rejects.toThrow();
    });

    test('Should return error when functions return error', async () => {
        transactionDTO.installments = -1;
        expect(service.execute(transactionDTO)).rejects.toThrow();
    });
});
