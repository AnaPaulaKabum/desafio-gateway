import { Link } from './Link.js';

export class CaptureCieloTransaction {
    Status: number;
    Tid: string;
    ProofOfSale: string;
    AuthorizationCode: string;
    ReturnCode: string;
    ReturnMessage: string;
    Links: Array<Link>;
}
