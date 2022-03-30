class Link {
    method: string;
    rel: string;
    href: string;
}

class Customer {
    Name: string;
    Identity: string;
    IdentityType: string;
}

class CreditCard {
    CardNumber: string;
    Holder: string;
    ExpirationDate: string;
    SaveCard: boolean;
    Brand: string;
}

class ExternalAuthentication {
    Cavv: string;
    Xid: string;
    Eci: string;
}

class Payment {
    ServiceTaxAmount: number;
    Installments: number;
    Interest: string;
    Capture: boolean;
    Authenticate: boolean;
    CreditCard: CreditCard;
    AuthenticationUrl: string;
    Tid: string;
    SoftDescriptor: string;
    PaymentId: string;
    Type: string;
    Amount: number;
    Currency: string;
    Country: string;
    ExtraDataCollection: Array<any>;
    Status: number;
    ReturnCode: string;
    ReturnMessage: string;
    ExternalAuthentication: ExternalAuthentication;
    Links: Array<Link>;
}

export class SendDebitTransitionResponse {
    MerchantOrderId: string;
    Customer: Customer;
    Payment: Payment;
}
