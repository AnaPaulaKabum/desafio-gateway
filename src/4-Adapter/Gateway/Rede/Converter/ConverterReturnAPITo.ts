import { plainToInstance } from 'class-transformer';
import { TransitionCreatedResponse } from '../../../../3-Domain/Entity/TransitionCreatedResponse.js';
import { SendTranstionReturn } from '../Response/SendTransitionReturn.js';


export abstract class ConverterReturnAPITo {


    static converte(Json:any) : TransitionCreatedResponse{
        
        let object = plainToInstance(SendTranstionReturn, Json); 

        let transitionCreatedResponse = new TransitionCreatedResponse();

        transitionCreatedResponse.TID = object.brandTid;
        transitionCreatedResponse.numberRequest = object.reference;
        transitionCreatedResponse.authorizationCode = object.authorizationCode;
        transitionCreatedResponse.nsu = object.nsu;
        transitionCreatedResponse.Status = object.returnMessage;

        return transitionCreatedResponse;
    }
}