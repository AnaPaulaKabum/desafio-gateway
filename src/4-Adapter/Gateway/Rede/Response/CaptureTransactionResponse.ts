import { Link } from "./Link.js";

export class CaptureTransactionResponse{

        reference: string ; 
        tid: string ;  
        nsu: string ; 
        authorizationCode: string ;  
        dateTime: string ;  
        returnCode: string ; 
        returnMessage: string ;
        links: Array<Link>
}