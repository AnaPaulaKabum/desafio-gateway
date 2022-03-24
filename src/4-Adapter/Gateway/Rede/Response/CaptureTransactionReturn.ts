import { Link } from "./Link";

export class CaptureTransactionReturn{

        reference: string ; 
        tid: string ;  
        nsu: string ; 
        authorizationCode: string ;  
        dateTime: string ;  
        returnCode: string ; 
        returnMessage: string ;
        links: Array<Link>
}