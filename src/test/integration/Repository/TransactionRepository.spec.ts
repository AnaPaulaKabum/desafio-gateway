import { CancelOrder } from '../../../Domain/Common/Transaction/CancelOrder';
import { CaptureOrder } from '../../../Domain/Common/Transaction/CaptureOrder';
import { TransactionOrder } from '../../../Domain/Common/Transaction/TransactionOrder';
import { ConnectDBTypeORM } from '../../../Infra/ConnectBD/TypeORM/ConnectDBTypeORM';
import { CancelOrderEntity } from '../../../Infra/ConnectBD/TypeORM/Entity/CancelOrderEntity';
import { CaptureOrderEntity } from '../../../Infra/ConnectBD/TypeORM/Entity/CaptureOrderEntity';
import { TransactionOrderEntity } from '../../../Infra/ConnectBD/TypeORM/Entity/TransactionOrderEntity';
import { Transaction1654287924093 } from '../../../Infra/ConnectBD/TypeORM/Migrate/1654287924093-Transaction';
import { Capture1654513784257 } from '../../../Infra/ConnectBD/TypeORM/Migrate/1654513784257-Capture';
import { Cancel1654518812859 } from '../../../Infra/ConnectBD/TypeORM/Migrate/1654518812859-Cancel';
import { TransactionRepository } from '../../../Infra/ConnectBD/TypeORM/Repository/Transaction/TransactionRepository';
import { StatusTransaction } from '../../../Shared/Enum/StatusTransaction';
import { TypeTransaction } from '../../../Shared/Enum/TypeTransaction.enum';

let connect: ConnectDBTypeORM;
let transctionRepository: TransactionRepository;

describe('Repository : TransactionRepository', () => {
    beforeAll(async function () {
        connect = new ConnectDBTypeORM(
            [TransactionOrderEntity, CaptureOrderEntity, CancelOrderEntity],
            [Transaction1654287924093, Capture1654513784257, Cancel1654518812859],
        );
        await connect.start();
        transctionRepository = new TransactionRepository(connect.appDataSource.manager);
    });

    afterEach(async () => {
        await connect.clearTable('Transaction');
        await connect.clearTable('Cancel');
        await connect.clearTable('Capture');
    });

    afterAll(async function () {
        await connect.close();
    });

    describe('SaveTransaction', () => {
        it('Deverá retornar um objeto Truthy com id preenchido ', async () => {
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

            const resultSave = await transctionRepository.saveTransaction(transactionOrder);

            expect(resultSave).toBeTruthy();
            expect(resultSave.id).toBeTruthy();
        });
    });

    describe('SaveCapture', () => {
        it('Deverá retornar um objeto Truthy com id preenchido', async () => {
            const captureOrder = new CaptureOrder('pedido123', 100, new Date(), '123456789', '1234');

            const resultSave = await transctionRepository.saveCapture(captureOrder);

            expect(resultSave).toBeTruthy();
            expect(resultSave.id).toBeTruthy();
        });
    });

    describe('SaveCancel', () => {
        it('Deverá retornar um objeto Truthy com id preenchido', async () => {
            const cancelOrder = new CancelOrder('pedido123', new Date(), 100, '123456789', '123456', '123');

            const resultSave = await transctionRepository.saveCancel(cancelOrder);

            expect(resultSave).toBeTruthy();
            expect(resultSave.id).toBeTruthy();
        });
    });

    describe('FindOne Transaction', () => {
        it('Deverá encontrar o mesmo registro que foi salvo anteriormente.', async () => {
            const tid = '100';
            const transactionOrder = new TransactionOrder(
                'pedido123',
                tid,
                TypeTransaction.CREDIT,
                StatusTransaction.NO_CAPTURE,
                100,
                'Teste',
                '100',
                '100',
                1,
            );
            const transactionSave = await transctionRepository.saveTransaction(transactionOrder);

            const result = await transctionRepository.findOne(tid);
            expect(result).toEqual(transactionSave);
        });
    });

    describe('SearchStatus', () => {
        it('Devera o status que acabou de salvar, e comparar o resultado', async () => {
            const tid = '100';
            const status = StatusTransaction.NO_CAPTURE;
            const transactionOrder = new TransactionOrder(
                'pedido123',
                tid,
                TypeTransaction.CREDIT,
                status,
                100,
                'Teste',
                '100',
                '100',
                1,
            );
            await transctionRepository.saveTransaction(transactionOrder);

            const result = await transctionRepository.searchStatus(tid);

            expect(result).toBe(status);
        });
    });

    describe('UpdateStatus', () => {
        it('Não deve retornar error', async () => {
            const tid = '100';
            const transactionOrder = new TransactionOrder(
                'pedido123',
                tid,
                TypeTransaction.CREDIT,
                StatusTransaction.NO_CAPTURE,
                100,
                'Teste',
                '100',
                '100',
                1,
            );
            await transctionRepository.saveTransaction(transactionOrder);
            const status = StatusTransaction.FINNALY;

            await transctionRepository.updateStatus(tid, status);

            const transaction = await transctionRepository.findOne(tid);
            expect(transaction?.status).toBe(StatusTransaction.FINNALY);
        });
    });
});
