import { CancelRequest } from './Application/Request/CancelRequest';
import { CaptureRequest } from './Application/Request/CaptureRequest';
import { SearchRequest } from './Application/Request/SearchRequest';
import { TransactionRequest } from './Application/Request/TransactionRequest';
import { TypeTransaction } from './Domain/Shared/Enum/TypeTransaction.enum';

export class FakeTransaction {
    static createTransactionRequest() {
        let transactionDTO = new TransactionRequest(
            'pedido129',
            TypeTransaction.CREDIT,
            2099,
            2,
            'John Snow',
            '5448280000000007',
            1,
            2028,
            '123',
            'Compra na loja XXX',
        );

        return transactionDTO;
    }

    static searchTransactionRequestNumberRequest() {
        let searchTrasaction = new SearchRequest();
        searchTrasaction.numberRequest = 'pedido1234';

        return searchTrasaction;
    }

    static searchTransactionRequestTid() {
        let searchTrasaction = new SearchRequest();
        searchTrasaction.tid = '430075';

        return searchTrasaction;
    }

    static captureTransactionRequest() {
        let captureTrasactionRequest = new CaptureRequest();
        captureTrasactionRequest.tid = '430075';
        captureTrasactionRequest.amount = 100;

        return captureTrasactionRequest;
    }

    static cancelTransactionRequest() {
        let captureTrasactionRequest = new CancelRequest();
        captureTrasactionRequest.tid = '10012205051406212774';
        captureTrasactionRequest.amount = 100;

        return captureTrasactionRequest;
    }
}
