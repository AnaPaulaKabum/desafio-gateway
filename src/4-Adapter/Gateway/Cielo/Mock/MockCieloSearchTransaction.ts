export abstract class MockCieloSearchTransaction {
    static search(paramNumberRequest: string): Promise<any> {
        const returnSearch = {
            MerchantOrderId: '2014111706',
            AcquirerOrderId: '202202231037440D1BD0',
            Customer: {
                Name: 'Comprador Teste',
                Address: {},
            },
            Payment: {
                ServiceTaxAmount: 0,
                Installments: 1,
                Interest: 'ByMerchant',
                Capture: false,
                Authenticate: false,
                CreditCard: {
                    CardNumber: '455187******0183',
                    Holder: 'Teste Holder',
                    ExpirationDate: '12/2030',
                    SaveCard: false,
                    Brand: 'Visa',
                    PaymentAccountReference: '92745135160550440006111072222',
                },
                ProofOfSale: '674532',
                Tid: '0223103744208',
                AuthorizationCode: '123456',
                Chargebacks: [
                    {
                        Amount: 10000,
                        CaseNumber: '123456',
                        Date: '2022-06-04',
                        ReasonCode: '104',
                        ReasonMessage: 'Outras Fraudes - Cartao Ausente',
                        Status: 'Received',
                        RawData: 'Client did not participate and did not authorize transaction',
                    },
                ],
                FraudAlert: {
                    Date: '2022-05-20',
                    ReasonMessage: 'Uso Ind Numeração',
                    IncomingChargeback: false,
                },
                PaymentId: '24bc8366-fc31-4d6c-8555-17049a836a07',
                Type: 'CreditCard',
                Amount: 10000,
                ReceivedDate: '2022-07-29 17:16:21',
                CapturedAmount: 9000,
                CapturedDate: '2022-07-29 17:16:22',
                VoidedAmount: 1000,
                VoidedDate: '2022-05-15 16:25:38',
                Currency: 'BRL',
                Country: 'BRA',
                ExtraDataCollection: [],
                Status: 1,
                Links: [
                    {
                        Method: 'GET',
                        Rel: 'self',
                        Href: 'https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}',
                    },
                    {
                        Method: 'PUT',
                        Rel: 'capture',
                        Href: 'https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/capture',
                    },
                    {
                        Method: 'PUT',
                        Rel: 'void',
                        Href: 'https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/void',
                    },
                ],
            },
        };

        return new Promise(function (resolve) {
            resolve(returnSearch);
        });
    }
}
