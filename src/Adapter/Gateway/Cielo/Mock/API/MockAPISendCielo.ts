export class MockAPISendCielo {
    private constructor() {}

    static sendCredit(transaction: any): Promise<any> {
        return new Promise(function (resolve) {
            resolve({
                MerchantOrderId: '2014111706',
                Customer: {
                    Name: 'Comprador crédito completo',
                    Identity: '11225468954',
                    IdentityType: 'CPF',
                    Email: 'compradorteste@teste.com',
                    Birthdate: '1991-01-02',
                    Address: {
                        Street: 'Rua Teste',
                        Number: '123',
                        Complement: 'AP 123',
                        ZipCode: '12345987',
                        City: 'Rio de Janeiro',
                        State: 'RJ',
                        Country: 'BRA',
                    },
                    DeliveryAddress: {
                        Street: 'Rua Teste',
                        Number: '123',
                        Complement: 'AP 123',
                        ZipCode: '12345987',
                        City: 'Rio de Janeiro',
                        State: 'RJ',
                        Country: 'BRA',
                    },
                },
                Payment: {
                    ServiceTaxAmount: 0,
                    Installments: 1,
                    Interest: 'ByMerchant',
                    Capture: true,
                    Authenticate: false,
                    CreditCard: {
                        CardNumber: '455187******0183',
                        Holder: 'Teste Holder',
                        ExpirationDate: '12/2030',
                        SaveCard: false,
                        Brand: 'Visa',
                        PaymentAccountReference: '92745135160550440006111072222',
                        CardOnFile: {
                            Usage: 'Used',
                            Reason: 'Unscheduled',
                        },
                    },
                    IsCryptoCurrencyNegotiation: true,
                    TryAutomaticCancellation: true,
                    ProofOfSale: '674532',
                    Tid: '0305020554239',
                    AuthorizationCode: '123456',
                    SoftDescriptor: '123456789ABCD',
                    PaymentId: '24bc8366-fc31-4d6c-8555-17049a836a07',
                    Type: 'CreditCard',
                    Amount: 15700,
                    CapturedAmount: 15700,
                    Country: 'BRA',
                    AirlineData: {
                        TicketNumber: 'AR988983',
                    },
                    ExtraDataCollection: [],
                    Status: 2,
                    ReturnCode: '6',
                    ReturnMessage: 'Operation Successful',
                    Links: [
                        {
                            Method: 'GET',
                            Rel: 'self',
                            Href: 'https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}',
                        },
                        {
                            Method: 'PUT',
                            Rel: 'void',
                            Href: 'https://apisandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/void',
                        },
                    ],
                },
            });
        });
    }

    static sendDebit(transaction: any): Promise<any> {
        const returnSendDebit = {
            MerchantOrderId: '2014111903',
            Customer: {
                Name: 'Comprador débito autenticação',
                Identity: '12345678912',
                IdentityType: 'cpf',
            },
            Payment: {
                ServiceTaxAmount: 0,
                Installments: 1,
                Interest: 'ByMerchant',
                Capture: false,
                Authenticate: true,
                CreditCard: {
                    CardNumber: '123412******1112',
                    Holder: 'Teste Holder',
                    ExpirationDate: '12/2030',
                    SaveCard: false,
                    Brand: 'Visa',
                },
                AuthenticationUrl:
                    'https://xxxxxxxxxxxx.xxxxx.xxx.xx/xxx/xxxxx.xxxx?id=c5158c1c7b475fdb91a7ad7cc094e7fe',
                Tid: '1006993069257E521001',
                SoftDescriptor: '123456789ABCD',
                PaymentId: 'f2dbd5df-c2ee-482f-ab1b-7fee039108c0',
                Type: 'DebitCard',
                Amount: 15700,
                Currency: 'BRL',
                Country: 'BRA',
                ExtraDataCollection: [],
                Status: 0,
                ReturnCode: '0',
                ReturnMessage: 'Transacao autorizada',
                ExternalAuthentication: {
                    Cavv: '123456789',
                    Xid: '987654321',
                    Eci: '5',
                },
                Links: [
                    {
                        Method: 'GET',
                        Rel: 'self',
                        Href: 'https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{Paymentid}',
                    },
                ],
            },
        };
        return new Promise(function (resolve) {
            resolve(returnSendDebit);
        });
    }
}
