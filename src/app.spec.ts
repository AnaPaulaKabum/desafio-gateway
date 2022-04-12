import { APP } from './app';
import { SearchTransactionOrder } from './Domain/Entity/Transaction/SearchTransactionOrder';
import { Card } from './Domain/Entity/Transaction/ValueObject/Card';
import { TransactionOrder } from './Domain/Entity/Transaction/ValueObject/TransactionOrder';
import { RefundOrder } from './Domain/Entity/Transaction/ValueObject/RefundOrder';

const gatewayUses = 1; //1-Rede 2- Cielo

describe('TransactionSend', () => {
    test('Should return not error if to send transactionSend', async () => {
        const methodUses = 1; //1-Send 2-Search 3-Capture 4-Cancel

        const returnSendTransaction = await APP.start(methodUses, gatewayUses, false);

        expect(returnSendTransaction).toBeTruthy();
        expect(returnSendTransaction).toBeInstanceOf(TransactionOrder);
    });
});

/*describe('SearchTransaction', () => {
    test('Should return not error if to send searchTransaction', async () => {
        const methodUses = 2; //1-Send 2-Search 3-Capture 4-Cancel

        const returnSearchTransaction = await APP.start(methodUses, gatewayUses, false);

        expect(returnSearchTransaction).toBeTruthy();
        expect(returnSearchTransaction.card).toBeInstanceOf(Card);
        expect(returnSearchTransaction.transaction).toBeInstanceOf(TransactionOrder);
        expect(returnSearchTransaction.refund).toBeInstanceOf(RefundOrder);
        expect(returnSearchTransaction).toBeInstanceOf(SearchTransactionOrder);
    });
});*/
