import { plainToInstance } from "class-transformer";
import { TransitionResponse } from "../../../../../3-Domain/Entity/TransitionSearchResponse.js";
import { CaptureTransitionReturn } from "../../Response/CaptureTransitionReturn.js";


export abstract class ReturnAPIToCaptureTransition {

    static converte(Json:any): TransitionResponse{

        let object = plainToInstance(CaptureTransitionReturn, Json); 

        let transitionSearchResponse = new TransitionResponse();

        transitionSearchResponse.TID = object.tid;
        transitionSearchResponse.numberRequest = object.reference;
        transitionSearchResponse.authorizationCode = object.authorizationCode;
        transitionSearchResponse.nsu = object.nsu;

        return transitionSearchResponse;
    }

}