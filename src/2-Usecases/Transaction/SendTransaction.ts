import {  IGateways } from "../../3-Domain/Core/Interfaces/IGateways.js";
import { IRegisterSuccessError } from "../../3-Domain/Core/Interfaces/IRegisterSucessError.js";
import { StatusTransaction } from "../../3-Domain/Core/Interfaces/Transaction/Enum/StatusTransaction.js";
import { ITransactionRepository } from "../../3-Domain/Core/Interfaces/Transaction/ITransitionRepository.js";
import { Transaction } from "../../3-Domain/Entity/Transaction.js";
import { MessageSucess } from "../../3-Domain/Util/MessageSuccess.js";
import { TransactionDTO } from "../../5-Shared/DTO/TransactionDTO.js";

export class SendTransaction{

    constructor(private readonly gateway : IGateways,
                private readonly repository: ITransactionRepository,
                private readonly register: IRegisterSuccessError){}

    public execute (transaction : TransactionDTO): Transaction{

        try {
            console.log('..SendTransaction(UseCases)');

            if (this.isValidToSend(transaction.numberRequest)){
                const transactionResult = this.gateway.sendTransaction(transaction);
                this.register.registerSuccess(MessageSucess.generateMessage('Enviado Transição'));  
                return transactionResult;       
            }

            return new Transaction();

        } catch (error) {    
            console.log(error);       
            this.register.registerError(error.message);
            return new Transaction();
        }
    }

    private isValidToSend(numberRequest:string){

        const status = this.repository.searchStatus(numberRequest);
        return status === StatusTransaction.READY
    }
}