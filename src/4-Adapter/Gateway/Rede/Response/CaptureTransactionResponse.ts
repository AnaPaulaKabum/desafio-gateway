import { Link } from './Link';

export class CaptureTransactionResponse {
    reference: string;
    tid: string;
    nsu: string;
    authorizationCode: string;
    dateTime: Date;
    returnCode: string;
    returnMessage: string;
    links: Array<Link>;
}
