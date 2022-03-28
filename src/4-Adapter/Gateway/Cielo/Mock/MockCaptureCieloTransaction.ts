import { TransactionCieloCaptureRequest } from '../Request/TransactionCieloCaptureRequest';

export abstract class MockCaptureCieloTransaction {
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

    ///1/sales/{paymentId}/capture?amount={Valor}
    static captureParcial(transactionCapture: TransactionCieloCaptureRequest): Promise<any> {
        return new Promise(function (resolve) {
            resolve({
                Status: 2,
                Tid: '0719094510712',
                ProofOfSale: '4510712',
                AuthorizationCode: '693066',
                ReasonCode: 0,
                ReasonMessage: 'Successful',
                ProviderReturnCode: '6',
                ProviderReturnMessage: 'Operation Successful',
                ReturnCode: '6',
                ReturnMessage: 'Operation Successful',
                Links: [
                    {
                        Method: 'GET',
                        Rel: 'self',
                        Href: 'https://api.cieloecommerce.cielo.com.br/1/sales/8b1d43ee-a918-40d2-ba62-e5665e7ccbd3',
                    },
                    {
                        Method: 'PUT',
                        Rel: 'void',
                        Href: 'https://api.cieloecommerce.cielo.com.br/1/sales/8b1d43ee-a918-40d2-ba62-e5665e7ccbd3/void',
                    },
                ],
            });
        });
    }
}
