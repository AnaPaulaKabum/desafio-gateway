import { Link } from "./Link.js";

export class CancelTransactionResponse{

    returnCode: string; 
    returnMessage: string; 
    refundId: string; 
    tid: string; 
    nsu: string;
    refundDateTime: Date
    cancelId: string;
    links: Array <Link>
}