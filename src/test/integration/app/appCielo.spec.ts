import { APP } from '../../../app';
import { SearchTransactionOrder } from '../../../Domain/Common/Transaction/SearchTransactionOrder';
import { TransactionOrder } from '../../../Domain/Common/Transaction/TransactionOrder';
import { CancelOrder } from '../../../Domain/Common/Transaction/CancelOrder';
import { CaptureOrder } from '../../../Domain/Common/Transaction/CaptureOrder';

const gatewayUses = 2; //1-Rede 2- Cielo

describe('Teste', () => {
    test.skip('xxx', async () => {
        expect(1).toBe(1);
    });
});



/*describe('TransactionSend', () => {
    test.skip('Should return not error if to send transactionSend', async () => {
        const methodUses = 1; //1-Send 2-Search 3-Capture 4-Cancel

        const returnSendTransaction = await APP.start(gatewayUses, methodUses, false);

        expect(returnSendTransaction).toBeTruthy();
        expect(returnSendTransaction).toBeInstanceOf(TransactionOrder);
    });
});

describe('SearchTransaction', () => {
    test.skip('Should return not error if to send searchTransaction', async () => {
        const methodUses = 2; //1-Send 2-Search 3-Capture 4-Cancel

        const returnSearchTransaction = await APP.start(gatewayUses, methodUses, false);

        expect(returnSearchTransaction).toBeTruthy();
        expect(returnSearchTransaction).toBeInstanceOf(SearchTransactionOrder);
    });
});

describe('CaptureTransaction', () => {
    test.skip('Should return not error if to send CaptureTransaction', async () => {
        const methodUses = 3; //1-Send 2-Search 3-Capture 4-Cancel

        const returnCaptureTransaction = await APP.start(gatewayUses, methodUses, false);

        expect(returnCaptureTransaction).toBeTruthy();
        expect(returnCaptureTransaction).toBeInstanceOf(CaptureOrder);
    });
});

describe('CancelTransaction', () => {
    test.skip('Should return not error if to send CancelTransaction', async () => {
        const methodUses = 4; //1-Send 2-Search 3-Capture 4-Cancel

        const returnCancelTransaction = await APP.start(gatewayUses, methodUses, false);

        expect(returnCancelTransaction).toBeTruthy();
        expect(returnCancelTransaction).toBeInstanceOf(CancelOrder);
    });
});*/
