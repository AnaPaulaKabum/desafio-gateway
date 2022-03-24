import { Link } from "./Link";

export class CancelTransectionReturn{

    returnCode: string; 
    returnMessage: string; 
    refundId: string; 
    tid: string; 
    nsu: string;
    refundDateTime: Date
    cancelId: string;
    links: Array <Link>
}