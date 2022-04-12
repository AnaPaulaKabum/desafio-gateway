import { Link } from './Link';

export class SendTransitionResponse {
    reference: string;
    tid: string;
    nsu: string;
    authorizationCode: string;
    dateTime: string;
    amount: number;
    installments: number;
    cardBin: string;
    last4: string;
    returnCode: string;
    returnMessage: string;
    brandTid: string;
    links: Array<Link> = [];
}
