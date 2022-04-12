import { APP } from './app';
import { TransactionOrder } from './Domain/Entity/Transaction/ValueObject/TransactionOrder';

describe('TransactionSend', () => {
    test('Should return not error if to send transactionSend', async () => {
        const methodUses = 1; //1-Send 2-Search 3-Capture 4-Cancel
        let gatewayUses = 1; //1-Rede 2- Cielo
        const returnSendTransaction = await APP.start(methodUses, gatewayUses, false);
        expect(returnSendTransaction).toBeTruthy();
        expect(returnSendTransaction).toBeInstanceOf(TransactionOrder);
    });
});
