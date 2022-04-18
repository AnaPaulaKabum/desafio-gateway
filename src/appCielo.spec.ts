import { APP } from './app';
import { SearchTransactionOrder } from './Domain/Entity/Transaction/SearchTransactionOrder';
import { TransactionOrder } from './Domain/Entity/Transaction/TransactionOrder';
import { CancelOrder } from './Domain/Entity/Transaction/CancelOrder';
import { CaptureOrder } from './Domain/Entity/Transaction/CaptureOrder';

const gatewayUses = 2; //1-Rede 2- Cielo

describe('TransactionSend', () => {
    test('Should return not error if to send transactionSend', async () => {
        const methodUses = 1; //1-Send 2-Search 3-Capture 4-Cancel

        const returnSendTransaction = await APP.start(gatewayUses, methodUses, false);

        expect(returnSendTransaction).toBeTruthy();
        expect(returnSendTransaction).toBeInstanceOf(TransactionOrder);
    });
});

describe('SearchTransaction', () => {
    test('Should return not error if to send searchTransaction', async () => {
        const methodUses = 2; //1-Send 2-Search 3-Capture 4-Cancel

        const returnSearchTransaction = await APP.start(gatewayUses, methodUses, false);

        expect(returnSearchTransaction).toBeTruthy();
        expect(returnSearchTransaction.transaction).toBeInstanceOf(TransactionOrder);
        expect(returnSearchTransaction).toBeInstanceOf(SearchTransactionOrder);
    });
});

describe('CaptureTransaction', () => {
    test('Should return not error if to send CaptureTransaction', async () => {
        const methodUses = 3; //1-Send 2-Search 3-Capture 4-Cancel

        const returnCaptureTransaction = await APP.start(gatewayUses, methodUses, false);

        expect(returnCaptureTransaction).toBeTruthy();
        expect(returnCaptureTransaction).toBeInstanceOf(CaptureOrder);
    });
});

describe('CancelTransaction', () => {
    test('Should return not error if to send CancelTransaction', async () => {
        const methodUses = 4; //1-Send 2-Search 3-Capture 4-Cancel

        const returnCancelTransaction = await APP.start(gatewayUses, methodUses, false);

        expect(returnCancelTransaction).toBeTruthy();
        expect(returnCancelTransaction).toBeInstanceOf(CancelOrder);
    });
});
