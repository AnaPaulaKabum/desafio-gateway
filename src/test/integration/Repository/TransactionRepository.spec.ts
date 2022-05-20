import { TransactionOrder } from '../../../Domain/Entity/Transaction/TransactionOrder';
import { ConnectDBTypeORM } from '../../../Infra/ConnectBD/TypeORM/ConnectDBTypeORM';
import { TransactionOrderEntity } from '../../../Infra/ConnectBD/TypeORM/Entity/TransactionOrderEntity';
import { TransactionRepository } from '../../../Infra/ConnectBD/TypeORM/Repository/Transaction/TransactionRepository';
import { StatusTransaction } from '../../../Shared/Enum/StatusTransaction';
import { TypeTransaction } from '../../../Shared/Enum/TypeTransaction.enum';

const connect = new ConnectDBTypeORM(TransactionOrderEntity);

describe('Repository : TransactionRepository', () => {
    const repositoryTransaction = new TransactionRepository(connect.appDataSource.manager);
    test('SaveTransaction', async () => {
        await connect.start();
        const transactionOrder = new TransactionOrder(
            'pedido123',
            '100',
            TypeTransaction.CREDIT,
            StatusTransaction.NO_CAPTURE,
            100,
            'Teste',
            '100',
            '100',
            1,
        );
        const result = await repositoryTransaction.saveTransaction(transactionOrder);

        expect(result).toBeTruthy();

        connect.close();
    });
});
