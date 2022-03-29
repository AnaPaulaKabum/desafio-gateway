class Link {
    method: string;
    rel: string;
    href: string;
}

class Address {
    street: string;
    number: number;
    complement: string;
    zipCode: string;
    city: string;
    state: string;
    country: string;
}

class Customer {
    name: string;
    email: string;
    birthdate: string;
    address: Address;
    deliveryAddress: Address;
}

class CreditCard {
    cardNumber: string;
    holder: string;
    expirationDate: string;
    securityCode: string;
    saveCard: string;
    brand: string;
    paymentAccountReference: string;
    cardOnFile: {
        usage: string;
        reason: string;
    };
}

class Payment {
    serviceTaxAmount: number;
    installments: number;
    interest: string;
    capture: true;
    authenticate: boolean;
    recurrent: boolean; // Payment.Recurrent:
    softDescriptor: string;
    creditCard: CreditCard;
    isCryptoCurrencyNegotiation: boolean;
    type: string;
    tryAutomaticCancellation: boolean;
    amount: number;
    proofOfSale: string;
    Tid: string;
    AuthorizationCode: string;
    paymentId: string;
    capturedAmount: number;
    country: string;
    airlineData: {
        ticketNumber: string;
    };
    extraDataCollection: Array<any>;
    status: number;
    returnCode: string;
    returnMessage: string;
    Link: Array<Link>;
}

export class SendCieloTransitionResponse {
    MerchantOrderId: string;
    Customer: Customer;
    Payment: Payment;
}
