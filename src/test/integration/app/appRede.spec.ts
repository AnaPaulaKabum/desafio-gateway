import { PaymentGatewaysController } from "../../../Application/Controller/PaymentGatewaysController";
import { CancelOrder } from "../../../Domain/Common/Transaction/CancelOrder";
import { CaptureOrder } from "../../../Domain/Common/Transaction/CaptureOrder";
import { SearchTransactionOrder } from "../../../Domain/Common/Transaction/SearchTransactionOrder";
import { TransactionOrder } from "../../../Domain/Common/Transaction/TransactionOrder";
import { StatusTransaction } from "../../../Domain/Shared/Enum/StatusTransaction";
import { TypeTransaction } from "../../../Domain/Shared/Enum/TypeTransaction.enum";
import { FakeTransaction } from "../../../FakeTransaction";
import { ConnectDBTypeORM } from "../../../Infra/ConnectBD/TypeORM/ConnectDBTypeORM";
import { CancelOrderEntity } from "../../../Infra/ConnectBD/TypeORM/Entity/CancelOrderEntity";
import { CaptureOrderEntity } from "../../../Infra/ConnectBD/TypeORM/Entity/CaptureOrderEntity";
import { LogEntity } from "../../../Infra/ConnectBD/TypeORM/Entity/LogEntity";
import { TransactionOrderEntity } from "../../../Infra/ConnectBD/TypeORM/Entity/TransactionOrderEntity";
import { Transaction1654287924093 } from "../../../Infra/ConnectBD/TypeORM/Migrate/1654287924093-Transaction";
import { Log1654290129463 } from "../../../Infra/ConnectBD/TypeORM/Migrate/1654290129463-Log";
import { Capture1654513784257 } from "../../../Infra/ConnectBD/TypeORM/Migrate/1654513784257-Capture";
import { Cancel1654518812859 } from "../../../Infra/ConnectBD/TypeORM/Migrate/1654518812859-Cancel";
import { LogRepository } from "../../../Infra/ConnectBD/TypeORM/Repository/Log/LogRepository";
import { TransactionRepository } from "../../../Infra/ConnectBD/TypeORM/Repository/Transaction/TransactionRepository";
import { configRede } from "../../../Infra/Gateway/Rede/configRede";
import { Mail } from "../../../Infra/Mail/Mail";
import { CancelTransaction } from "../../../Usecases/Transaction/CancelTransaction";
import { CaptureTransaction } from "../../../Usecases/Transaction/CaptureTransaction";
import { SearchTransaction } from "../../../Usecases/Transaction/SearchTransaction";
import { SendTransaction } from "../../../Usecases/Transaction/SendTransaction";
import { GatewayRedeMock } from "../../Mock/Gateway/Rede/GatewayRede";
import { TransactionSeed } from "../../Seed/TransactionSeed";

let paymentGatewaysController : PaymentGatewaysController;
let connect: ConnectDBTypeORM;

beforeAll(async () => {
    
    connect = new ConnectDBTypeORM(
        [TransactionOrderEntity, CaptureOrderEntity, CancelOrderEntity,LogEntity],
        [Transaction1654287924093, Capture1654513784257, Cancel1654518812859,Log1654290129463],
    );
    await connect.start();
    await connect.clearTableAll();

    const repositoryTransaction = new TransactionRepository(connect.appDataSource.manager);
    const repositoryLog = new LogRepository(LogEntity, connect.appDataSource.manager);
    const mail = new Mail();
    const gateway = new GatewayRedeMock();

    const transactionSeed = new TransactionSeed(repositoryTransaction);
    await transactionSeed.generateTransactionFix(createTransactionFake());

    paymentGatewaysController = new PaymentGatewaysController(
        new SendTransaction(gateway, configRede(), repositoryTransaction, repositoryLog, mail),
        new SearchTransaction(gateway, repositoryLog),
        new CaptureTransaction(gateway, repositoryTransaction, repositoryLog, mail),
        new CancelTransaction(gateway, repositoryTransaction, repositoryLog, mail),
    );
  });

  afterAll(async () => {
    await connect.close();
  });

describe('TransactionSend', () => {
    test('Should return not error if to send transactionSend', async () => {
        const returnSendTransaction = await paymentGatewaysController.sendTransactions(FakeTransaction.createTransactionRequest())

        expect(returnSendTransaction).toBeTruthy();
        expect(returnSendTransaction).toBeInstanceOf(TransactionOrder);
    });
});


describe('SearchTransaction', () => {
    test('Should return not error if to send searchTransaction', async () => {

        const returnSearchTransaction = await paymentGatewaysController.searchTransactions(FakeTransaction.searchTransactionRequestNumberRequest())

        expect(returnSearchTransaction).toBeTruthy();
        expect(returnSearchTransaction).toBeInstanceOf(SearchTransactionOrder);
    });
});

describe('CaptureTransaction', () => {
    test('Should return not error if to send CaptureTransaction', async () => {

        const returnCaptureTransaction = await paymentGatewaysController.captureTransactions(FakeTransaction.captureTransactionRequest())

        expect(returnCaptureTransaction).toBeTruthy();
        expect(returnCaptureTransaction).toBeInstanceOf(CaptureOrder);
    });
});

describe('CancelTransaction', () => {
    test('Should return not error if to send CancelTransaction', async () => {
        const returnCancelTransaction = await paymentGatewaysController.cancelReversalTransactions(FakeTransaction.cancelTransactionRequest())

        expect(returnCancelTransaction).toBeTruthy();
        expect(returnCancelTransaction).toBeInstanceOf(CancelOrder);
    });
});

const createTransactionFake = (): TransactionOrder[] => {

   const transactionOne = new TransactionOrder(
    '100',
    '430075',
    TypeTransaction.CREDIT,
    StatusTransaction.NO_CAPTURE,
    100,
    'Teste',
    '100',
    '100',
    2
    );

    const transactionTwo = new TransactionOrder(
        '100',
        '10012205051406212774',
        TypeTransaction.CREDIT,
        StatusTransaction.NO_CAPTURE,
        100,
        'Teste',
        '100',
        '100',
        2
        );

    return [transactionOne,transactionTwo]
}

