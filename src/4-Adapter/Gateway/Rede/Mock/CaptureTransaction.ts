export abstract class MockCaptureTransaction {
    static capture(paramNumberRequest: string, amount: number): Promise<any> {
        return new Promise(function (resolve, reject) {
            resolve({
                reference: 'pedido123',
                tid: '8345000363484052380',
                nsu: '7648531',
                authorizationCode: '186376',
                dateTime: '2017-02-28T08:54:00.000-03:00',
                returnCode: '00',
                returnMessage: 'Success.',
                links: [
                    {
                        method: 'GET',
                        rel: 'transaction',
                        href: 'https://sandbox-erede.useredecloud.com.br/v1/transactions/9274256037511432483',
                    },
                    {
                        method: 'POST',
                        rel: 'refund',
                        href: 'https://sandbox-erede.useredecloud.com.br/v1/transactions/9274256037511432483/refunds',
                    },
                ],
            });
        });
    }
}
