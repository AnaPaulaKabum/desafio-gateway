import { Mail } from '../../../Adapter/Mail/Mail';
import { TransactionDTO } from '../../../Shared/DTO/TransactionDTO';
import { TypeTransaction } from '../../../Shared/Enum/TypeTransaction.enum';
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
    beforeEach(() => {
        const gateway = new GatewayMock();
        repositoryTransaction = new TransactionRepositoryMock();
        const repositoryLog = new LogRepositoryMock();
        const mail = new Mail();
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

    test('Should return how many times it called the saveTransaction', async () => {
        jest.spyOn(repositoryTransaction, 'saveTransaction').mockImplementation();
        await service.execute(transactionDTO);
        expect(repositoryTransaction.saveTransaction).toHaveBeenCalledTimes(1);
    });
});
