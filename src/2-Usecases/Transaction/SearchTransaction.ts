import {  IGateways } from "../../3-Domain/Core/Interfaces/IGateways.js";
import { IMail } from "../../3-Domain/Core/Interfaces/IMail.js";
import { IRegister } from "../../3-Domain/Core/Interfaces/IRegister.js";
import { ILogRepository } from "../../3-Domain/Core/Interfaces/Transaction/Repository/ILogRepository.js";
import { ITransactionRepository } from "../../3-Domain/Core/Interfaces/Transaction/Repository/ITransitionRepository.js";
import { Log } from "../../3-Domain/Entity/Log.js";
import { Transaction } from "../../3-Domain/Entity/Transaction.js";
import { MessageSucess } from "../../3-Domain/Util/MessageSuccess.js";

export class SearchTransaction{

    constructor(private readonly gateway : IGateways,
                private readonly repositoryTransaction: ITransactionRepository,
                private readonly repositoryLog: ILogRepository,
                private readonly mail: IMail){}

    public execute(numberRequest:string): Promise<Transaction>{

        try {
             const resultado = this.gateway.searchTransaction(numberRequest)
             this.repositoryLog.save(new Log(MessageSucess.generateMessage('Consultado Transação'),'admin', new Date()))
             return resultado 

        } catch (error) {
            
            this.repositoryLog.save(new Log(MessageSucess.generateMessage('Erro ao consultar Transação'),'admin', new Date()));
            throw new Error(MessageSucess.generateMessage('Erro ao consultar Transação'));
        }
    }
}