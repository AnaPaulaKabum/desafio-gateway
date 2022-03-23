import { plainToInstance } from "class-transformer";
import { TransitionResponse } from "../../../../../3-Domain/Entity/TransitionSearchResponse.js";
import { SearchTransitionReturn } from "../../Response/SearchTransitionReturn.js";


export abstract class ReturnAPIToSearchTransition {

    static converte(Json:any): TransitionResponse{

        let object = plainToInstance(SearchTransitionReturn, Json); 

        let transitionSearchResponse = new TransitionResponse();

        transitionSearchResponse.TID = object.authorization.tid;
        transitionSearchResponse.numberRequest = object.authorization.reference;
        transitionSearchResponse.authorizationCode = object.authorization.authorizationCode;
        transitionSearchResponse.nsu = object.capture.nsu;

        return transitionSearchResponse;
    }

}