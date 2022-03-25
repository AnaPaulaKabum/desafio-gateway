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
    CardNumber: string;
    Holder: string;
    ExpirationDate: string;
    SecurityCode: string;
    SaveCard: string;
    Brand: string;
    CardOnFile: {
        Usage: string;
        Reason: string;
    };
}

class Payment {
    currency: string;
    country: string;
    serviceTaxAmount: number;
    installments: number;
    interest: string;
    capture: true;
    Authenticate: boolean;
    Recurrent: boolean; // Payment.Recurrent:
    SoftDescriptor: string;
    CreditCard: CreditCard;
    IsCryptoCurrencyNegotiation: true;
    Type: string;
    Amount: number;
    AirlineData: {
        TicketNumber: string;
    };
}

export class TransactionCieloCreatedRequest {
    MerchantOrderId: string;
    Customer: Customer;
    Payment: Payment;
}
