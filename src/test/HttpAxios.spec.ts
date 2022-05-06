import { HttpAxios } from '../Adapter/HTTP/AXIOS/HttpAxios';

describe('Teste HttpAxios', () => {
    const urlbase = 'https://sandbox-erede.useredecloud.com.br';
    const username = '23172018';
    const password = '63c968b7b58a46a5b260fe812d4a2fb0';

    const http = new HttpAxios();
    http.setBaseUrl(urlbase);
    http.setAuth(username, password);

    test.skip('Testa conexão para consultar uma transação', async () => {
        const resource = '/v1/transactions/';
        const id = '10012204291418405486';

        const resultado = await http.get(resource + id);

        expect(resultado).toBeTruthy();
    }, 10000);

    test.skip('Testa conexão ao enviar uma transação.', async () => {
        const data = {
            capture: false,
            kind: 'credit',
            reference: '10012204291418405486',
            amount: 100,
            installments: 2,
            cardholderName: 'John Snow',
            cardNumber: '5448280000000007',
            expirationMonth: 1,
            expirationYear: 2028,
            securityCode: '123',
            softDescriptor: 'string',
            subscription: false,
            origin: 1,
            distributorAffiliation: 0,
            brandTid: 'string',
            storageCard: '1',
        };

        const resource = '/v1/transactions';
        const resultado = await http.post(resource, data);

        expect(resultado).toBeTruthy();
    }, 10000);

    test.skip('Testa conexão ao cancelar uma transação.', async () => {
        const id = '10012204291418405486';
        const resource = '/v1/transactions/' + id + '/refunds';
        const data = { amount: 100 };

        const resultado = await http.post(resource, data);

        expect(resultado).toBeTruthy();
    }, 15000);
});
