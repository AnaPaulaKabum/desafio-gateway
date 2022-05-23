import { TransactionOrder } from '../../../Domain/Entity/Transaction/TransactionOrder';
import { ConnectDBTypeORM } from '../../../Infra/ConnectBD/TypeORM/ConnectDBTypeORM';
import { CancelOrderEntity } from '../../../Infra/ConnectBD/TypeORM/Entity/CancelOrderEntity';
import { CaptureOrderEntity } from '../../../Infra/ConnectBD/TypeORM/Entity/CaptureOrderEntity';
import { TransactionOrderEntity } from '../../../Infra/ConnectBD/TypeORM/Entity/TransactionOrderEntity';
import { TransactionRepository } from '../../../Infra/ConnectBD/TypeORM/Repository/Transaction/TransactionRepository';
import { StatusTransaction } from '../../../Shared/Enum/StatusTransaction';
import { TypeTransaction } from '../../../Shared/Enum/TypeTransaction.enum';

let connect: ConnectDBTypeORM;
let repository: TransactionRepository;

describe('Repository : TransactionRepository', () => {
    beforeEach(async function () {
        connect = new ConnectDBTypeORM([TransactionOrderEntity, CaptureOrderEntity, CancelOrderEntity]);
        await connect.start();
        repository = new TransactionRepository(connect.appDataSource.manager);
    });

    afterEach(async function () {
        await connect.close();
    });

    describe('SaveTransaction', () => {
        test('Não deve retornar error', async () => {
            connect.appDataSource.options;

            repository = new TransactionRepository(connect.appDataSource.manager);
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
            const result = await repository.saveTransaction(transactionOrder);

            expect(result).toBeTruthy();
        });
    });
});
