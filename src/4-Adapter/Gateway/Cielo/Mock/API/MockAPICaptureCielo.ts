import { TransactionCieloCaptureRequest } from '../../Request/TransactionCieloCaptureRequest';

export abstract class MockAPICaptureCielo {
    //put /1/sales/{PaymentId}/capture
    static captureTotal(transactionCapture: TransactionCieloCaptureRequest): Promise<any> {
        return new Promise(function (resolve) {
            resolve({
                Status: 2,
                Tid: '0719094510712',
                ProofOfSale: '4510712',
                AuthorizationCode: '693066',
                ReturnCode: '6',
                ReturnMessage: 'Operation Successful',
                Links: [
                    {
                        Method: 'GET',
                        Rel: 'self',
                        Href: 'https://api.cieloecommerce.cielo.com.br/1/sales/{PaymentId}',
                    },
                    {
                        Method: 'PUT',
                        Rel: 'void',
                        Href: 'https://api.cieloecommerce.cielo.com.br/1/sales/{PaymentId}/void',
                    },
                ],
            });
        });
    }
}
