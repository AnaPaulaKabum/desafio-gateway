class Customer {
    Name: string;
    Address: {};
}

class CreditCard {
    CardNumber: string;
    Holder: string;
    ExpirationDate: string;
    SaveCard: boolean;
    Brand: string;
    PaymentAccountReference: string;
    SecurityCode: string;
}

class Chargebacks {
    Amount: number;
    CaseNumber: number;
    Date: Date;
    ReasonCode: string;
    ReasonMessage: string;
    Status: string;
    RawData: string;
}

class FraudAlert {
    Date: Date;
    ReasonMessage: string;
    IncomingChargeback: boolean;
}

class Link {
    Method: string;
    Rel: string;
    Href: string;
}

class Payment {
    ServiceTaxAmount: number;
    Installments: number;
    Interest: string;
    Capture: boolean;
    Authenticate: boolean;
    CreditCard: CreditCard;
    ProofOfSale: string;
    Tid: string;
    AuthorizationCode: string;
    Chargebacks: Array<Chargebacks>;
    FraudAlert: FraudAlert;
    PaymentId: string;
    Type: string;
    Amount: number;
    ReceivedDate: Date;
    CapturedAmount: string;
    CapturedDate: Date;
    VoidedAmount: number;
    VoidedDate: Date;
    Currency: string;
    Country: string;
    ExtraDataCollection: Array<any>;
    Status: number;
    Links: Array<Link>;
}

export class SearchCieloTransactionResponse {
    MerchantOrderId: string;
    AcquirerOrderId: string;
    Customer: Customer;
    Payment: Payment;
}
