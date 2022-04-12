import { APP } from './app';
import { SearchTransactionOrder } from './Domain/Entity/Transaction/SearchTransactionOrder';
import { Card } from './Domain/Entity/Transaction/ValueObject/Card';
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

describe('SearchTransaction', () => {
    test('Should return not error if to send searchTransaction', async () => {
        const methodUses = 1; //1-Send 2-Search 3-Capture 4-Cancel
        let gatewayUses = 2; //1-Rede 2- Cielo
        const returnSearchTransaction = await APP.start(methodUses, gatewayUses, false);

        expect(returnSearchTransaction).toBeTruthy();
        expect(returnSearchTransaction).toBeInstanceOf(SearchTransactionOrder);
        expect(returnSearchTransaction.card).toBeInstanceOf(Card);
        expect(returnSearchTransaction.transaction).toBeInstanceOf(TransactionOrder);
    });
});
