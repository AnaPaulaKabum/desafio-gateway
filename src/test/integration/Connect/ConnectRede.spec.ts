import { ConnectRede } from '../../../Adapter/Gateway/Rede/ConnectRede';
import { HttpAxios } from '../../../Adapter/HTTP/AXIOS/HttpAxios';
import { CancelTransactionDTO } from '../../../Shared/DTO/CancelTransactionDTO';
import { CaptureTransactionDTO } from '../../../Shared/DTO/CaptureTransactionDTO';
import { SearchTransactionDTO } from '../../../Shared/DTO/SearchTransactionDTO';
import { TransactionDTO } from '../../../Shared/DTO/TransactionDTO';
import { TypeTransaction } from '../../../Shared/Enum/TypeTransaction.enum';

describe('ConnectRede', () => {
    const http = new HttpAxios();
    const connectRede = new ConnectRede(http);

    test.skip('Consulta Transacação na Rede', async () => {
        const searchTransaction = new SearchTransactionDTO();
        searchTransaction.numberRequest = '10012204291418405486';

        const resultado = await connectRede.searchTransaction(searchTransaction);
        console.log(JSON.stringify(resultado));

        expect(resultado).toBeTruthy();
    }, 10000);

    test.skip('Testa conexão ao enviar uma transação.', async () => {
        const transactionDTO = new TransactionDTO();
        transactionDTO.amount = 100;
        transactionDTO.kind = TypeTransaction.CREDIT;
        transactionDTO.numberRequest = 'pedido123';
        transactionDTO.installments = 2;
        transactionDTO.cardHolderName = 'John Snow';
        transactionDTO.cardNumber = '5448280000000007';
        transactionDTO.expirationMonth = 1;
        transactionDTO.expirationYear = 2028;
        transactionDTO.cardSecurityCode = '123';
        transactionDTO.softDescriptor = 'softdescriptor_teste';

        const resultado = await connectRede.sendTransaction(transactionDTO);

        expect(resultado).toBeTruthy();
    }, 10000);

    test.skip('Testa conexão ao cancelar uma transação.', async () => {
        const cancelTransactionDTO = new CancelTransactionDTO();
        cancelTransactionDTO.amount = 100;
        cancelTransactionDTO.numberRequest = '10012204291418405486';

        const resultado = await connectRede.cancelTransaction(cancelTransactionDTO);
        console.log(JSON.stringify(resultado));
        expect(resultado).toBeTruthy();
    }, 15000);

    test.skip('Testa conexão ao capturar uma transação.', async () => {
        const capturarTransactionDTO = new CaptureTransactionDTO();
        capturarTransactionDTO.amount = 100;
        capturarTransactionDTO.tid = '10012204291418405486';

        const resultado = await connectRede.captureTransaction(capturarTransactionDTO);
        console.log(JSON.stringify(resultado));
        expect(resultado).toBeTruthy();
    }, 15000);
});
