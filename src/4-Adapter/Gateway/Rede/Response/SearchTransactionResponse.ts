import { Link } from './Link';

class Capture {
    dateTime: Date;
    nsu: string;
    amount: number;
}

class Authorization {
    dateTime: Date;
    returnCode: string;
    returnMessage: string;
    affiliation: number;
    status: string;
    reference: string;
    tid: string;
    nsu: string;
    authorizationCode: string;
    kind: string;
    amount: number;
    installments: number;
    currency: string;
    cardHolderName: string;
    cardBin: string;
    last4: string;
    softDescriptor: string;
    origin: number;
    subscription: boolean;
    distributorAffiliation;
}

class Refund {
    dateTime: Date;
    refundId: string;
    status: string;
    amount: number;
}

export class SearchTransactionResponse {
    requestDateTime: Date;
    authorization: Authorization;
    capture: Capture;
    refunds: Refund;
    links: Array<Link>;
}
