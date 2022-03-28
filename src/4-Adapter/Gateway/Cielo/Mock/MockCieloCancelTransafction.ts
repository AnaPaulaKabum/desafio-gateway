export abstract class MockCieloCancelTransafction {
    static cancelTotal(numberRequest: string): Promise<any> {
        const returnCancel = {
            Status: 10,
            Tid: '0719094510712',
            ProofOfSale: '4510712',
            AuthorizationCode: '693066',
            ReturnCode: '9',
            ReturnMessage: 'Operation Successful',
            Links: [
                {
                    Method: 'GET',
                    Rel: 'self',
                    Href: 'https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/{PaymentId}',
                },
            ],
        };
        return new Promise(function (resolve) {
            resolve(returnCancel);
        });
    }

    static cancelParcial(numberRequest: string): Promise<any> {
        const returnCancel = {
            Status: 2,
            Tid: '0719094510712',
            ProofOfSale: '4510712',
            AuthorizationCode: '693066',
            ReasonCode: 0,
            ReasonMessage: 'Successful',
            ProviderReturnCode: '0',
            ProviderReturnMessage: 'Operation Successful',
            ReturnCode: '0',
            ReturnMessage: 'Operation Successful',
            Links: [
                {
                    Method: 'GET',
                    Rel: 'self',
                    Href: 'https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/4d7be764-0e81-4446-b31e-7eb56bf2c9a8',
                },
                {
                    Method: 'PUT',
                    Rel: 'void',
                    Href: 'https://apisandbox.cieloecommerce.cielo.com.br/1/sales/4d7be764-0e81-4446-b31e-7eb56bf2c9a8/void',
                },
            ],
        };
        return new Promise(function (resolve) {
            resolve(returnCancel);
        });
    }
}
