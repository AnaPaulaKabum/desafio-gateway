import {  IGateways } from "../../3-Domain/Core/Interfaces/IGateways.js";
import { IRegisterSuccessError } from "../../3-Domain/Core/Interfaces/IRegisterSucessError.js";
import { ITransactionRepository } from "../../3-Domain/Core/Interfaces/Transaction/ITransitionRepository.js";
import { Transaction } from "../../3-Domain/Entity/Transaction.js";
import { TransactionCreatedResponse } from "../../3-Domain/Entity/TransactionCreatedResponse.js";
import { MessageSucess } from "../../3-Domain/Util/MessageSuccess.js";

export class SendTransaction{

    constructor(private readonly gateway : IGateways,
                private readonly repository: ITransactionRepository,
                private readonly register: IRegisterSuccessError){}

    public execute (Transaction : Transaction): TransactionCreatedResponse{

        try {
            console.log('..SendTransaction(UseCases)');

            if (Transaction.isValidToSend(this.repository)){
                const TransactionResult = this.gateway.sendTransaction(Transaction);
                this.register.registerSuccess(MessageSucess.generateMessage('Enviado Transição'));  
                return TransactionResult;       
            }

            return new TransactionCreatedResponse();

        } catch (error) {    
            console.log(error);       
            this.register.registerError(error.message);
            return new TransactionCreatedResponse();
        }
    }
}