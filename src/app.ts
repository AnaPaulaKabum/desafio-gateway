import { PaymentGatewaysController } from './Application/Controller/PaymentGatewaysController';
import { FakeTransaction } from './FakeTransaction';
import { StartFactory } from './StartFactory';

export class APP {
    static async start(gatewayUses: number, methodUses: number, log: boolean, testAPI: boolean = false): Promise<any> {
        const { sendTransaction, searchTransaction, captureTransaction, cancelTransaction } =
            await StartFactory.transactionServices(gatewayUses, testAPI);

        const paymentGatewaysController = new PaymentGatewaysController(
            sendTransaction,
            searchTransaction,
            captureTransaction,
            cancelTransaction,
        );

        let result;
        switch (methodUses) {
            case 1:
                result = await paymentGatewaysController.sendTransactions(FakeTransaction.createTransactionRequest());
                break;
            case 2:
                result = await paymentGatewaysController.searchTransactions(
                    FakeTransaction.searchTransactionRequestTid(),
                );
                break;
            case 3:
                result = await paymentGatewaysController.captureTransactions(
                    FakeTransaction.captureTransactionRequest(),
                );
                break;
            case 4:
                result = await paymentGatewaysController.cancelReversalTransactions(
                    FakeTransaction.cancelTransactionRequest(),
                );
                break;
        }

        if (log) {
            console.log('----------');

            if (gatewayUses === 1) console.log('Resultado Rede: ');
            else console.log('Resultado Cielo: ');

            console.log(result);
        }
        return result;
    }
}

try {
    const methodUses = 1; //1-Send 2-Search 3-Capture 4-Cancel
    let gatewayUses = 1; //1-Rede 2- Cielo
    const testAPI = true;
    APP.start(gatewayUses, methodUses, true, testAPI);
} catch (error) {
    console.error('Erro app' + error);
}
