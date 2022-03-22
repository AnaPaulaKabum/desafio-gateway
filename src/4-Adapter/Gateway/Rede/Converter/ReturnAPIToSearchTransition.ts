import { plainToInstance } from "class-transformer";
import { TransitionSearchResponse } from "../../../../3-Domain/Entity/TransitionSearchResponse.js";
import { SearchTransitionReturn } from "../Response/SearchTransitionReturn.js";


export abstract class ReturnAPIToSearchTransition {

    static converte(Json:any): TransitionSearchResponse{

        let object = plainToInstance(SearchTransitionReturn, Json); 

        let transitionSearchResponse = new TransitionSearchResponse();

        transitionSearchResponse.TID = object.authorization.tid;
        transitionSearchResponse.numberRequest = object.authorization.reference;
        transitionSearchResponse.authorizationCode = object.authorization.authorizationCode;
        transitionSearchResponse.nsu = object.capture.nsu;

        return transitionSearchResponse;
    }

}