import { CancelOrder } from '../../../Domain/Entity/Transaction/CancelOrder';
import { CaptureOrder } from '../../../Domain/Entity/Transaction/CaptureOrder';
import { TransactionOrder } from '../../../Domain/Entity/Transaction/TransactionOrder';
import { ConnectDBTypeORM } from '../../../Infra/ConnectBD/TypeORM/ConnectDBTypeORM';
import { CancelOrderEntity } from '../../../Infra/ConnectBD/TypeORM/Entity/CancelOrderEntity';
import { CaptureOrderEntity } from '../../../Infra/ConnectBD/TypeORM/Entity/CaptureOrderEntity';
import { TransactionOrderEntity } from '../../../Infra/ConnectBD/TypeORM/Entity/TransactionOrderEntity';
import { TransactionRepository } from '../../../Infra/ConnectBD/TypeORM/Repository/Transaction/TransactionRepository';
import { StatusTransaction } from '../../../Shared/Enum/StatusTransaction';
import { TypeTransaction } from '../../../Shared/Enum/TypeTransaction.enum';

let connect: ConnectDBTypeORM;
let transctionRepository: TransactionRepository;

describe('Repository : TransactionRepository', () => {
    beforeEach(async function () {
        connect = new ConnectDBTypeORM([TransactionOrderEntity, CaptureOrderEntity, CancelOrderEntity]);
        await connect.start();
        transctionRepository = new TransactionRepository(connect.appDataSource.manager);
    });

    afterEach(async function () {
        await connect.close();
    });

    describe('SaveTransaction', () => {
        it('Não deve retornar error', async () => {
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
            const result = await transctionRepository.saveTransaction(transactionOrder);
            expect(result).toBeTruthy();
        });
    });

    describe('SaveCapture', () => {
        it('Não deve retornar error', async () => {
            const captureOrder = new CaptureOrder('pedido123', 100, new Date(), '123456789', '1234');
            const result = await transctionRepository.saveCapture(captureOrder);
            expect(result).toBeTruthy();
        });
    });

    describe('SaveCancel', () => {
        it('Não deve retornar error', async () => {
            const cancelOrder = new CancelOrder('pedido123', new Date(), 100, '123456789', '123456', '123');
            const result = await transctionRepository.saveCancel(cancelOrder);
            expect(result).toBeTruthy();
        });
    });

    describe('findOne', () => {
        it('Não deve retornar error', async () => {
            const tid = '100';
            const result = await transctionRepository.findOne(tid);
            expect(result).toBeTruthy();
        });
    });

    describe('searchStatus', () => {
        it('Não deve retornar error', async () => {
            const tid = '100';
            const result = await transctionRepository.searchStatus(tid);

            expect(result).toBeTruthy();
        });
    });
});
