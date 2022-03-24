import { plainToInstance } from 'class-transformer';
import { TransactionCreatedResponse } from '../../../../../3-Domain/Entity/TransactionCreatedResponse.js';
import { SendTranstionReturn } from '../../Response/SendTransitionReturn.js';

export abstract class ReturnAPIToTransactionCreatedResponse {


    static converte(Json:any) : TransactionCreatedResponse{
        
        let object = plainToInstance(SendTranstionReturn, Json); 

        let transactionCreatedResponse = new TransactionCreatedResponse();

        transactionCreatedResponse.TID = object.brandTid;
        transactionCreatedResponse.numberRequest = object.reference;
        transactionCreatedResponse.authorizationCode = object.authorizationCode;
        transactionCreatedResponse.nsu = object.nsu;
        transactionCreatedResponse.Status = object.returnMessage;

        return transactionCreatedResponse;
    }
}