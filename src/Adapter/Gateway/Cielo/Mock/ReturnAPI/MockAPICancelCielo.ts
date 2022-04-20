export class MockAPICancelCielo {
    private constructor() {}

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
}
