import { CancelOrder } from '../../../Domain/Entity/Transaction/CancelOrder';
import { CaptureOrder } from '../../../Domain/Entity/Transaction/CaptureOrder';
import { TransactionOrder } from '../../../Domain/Entity/Transaction/TransactionOrder';
import { ConnectDBTypeORM } from '../../../Infra/ConnectBD/TypeORM/ConnectDBTypeORM';
import { CancelOrderEntity } from '../../../Infra/ConnectBD/TypeORM/Entity/CancelOrderEntity';
import { CaptureOrderEntity } from '../../../Infra/ConnectBD/TypeORM/Entity/CaptureOrderEntity';
import { TransactionOrderEntity } from '../../../Infra/ConnectBD/TypeORM/Entity/TransactionOrderEntity';
import { Transaction1654287924093 } from '../../../Infra/ConnectBD/TypeORM/Migrate/1654287924093-Transaction';
import { Log1654290129463 } from '../../../Infra/ConnectBD/TypeORM/Migrate/1654290129463-Log';
import { Capture1654513784257 } from '../../../Infra/ConnectBD/TypeORM/Migrate/1654513784257-Capture';
import { Cancel1654518812859 } from '../../../Infra/ConnectBD/TypeORM/Migrate/1654518812859-Cancel';
import { TransactionRepository } from '../../../Infra/ConnectBD/TypeORM/Repository/Transaction/TransactionRepository';
import { StatusTransaction } from '../../../Shared/Enum/StatusTransaction';
import { TypeTransaction } from '../../../Shared/Enum/TypeTransaction.enum';

let connect: ConnectDBTypeORM;
let transctionRepository: TransactionRepository;

describe('Repository : TransactionRepository', () => {
    beforeEach(async function () {
        connect = new ConnectDBTypeORM(
            [TransactionOrderEntity, CaptureOrderEntity, CancelOrderEntity],
            [Transaction1654287924093, Log1654290129463, Capture1654513784257, Cancel1654518812859],
        );
        await connect.start();
        transctionRepository = new TransactionRepository(connect.appDataSource.manager);
    });

    afterEach(async function () {
        await connect.close();
    });

    describe('SaveTransaction', () => {
        it.skip('Não deve retornar error', async () => {
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

    describe('updateStatus', () => {
        it('Não deve retornar error', async () => {
            const tid = '100';
            const status = StatusTransaction.FINNALY;
            const result = await transctionRepository.updateStatus(tid, status);
            console.log(JSON.stringify(result));

            expect(result).toBeTruthy();
        });
    });
});
