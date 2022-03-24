import { IGateways } from "../../3-Domain/Core/Interfaces/IGateways.js";
import { IMail } from "../../3-Domain/Core/Interfaces/IMail.js";
import { ILogRepository } from "../../3-Domain/Core/Interfaces/Transaction/Repository/ILogRepository.js";
import { ITransactionRepository } from "../../3-Domain/Core/Interfaces/Transaction/Repository/ITransitionRepository.js";
import { CancelTransaction } from "../../3-Domain/Entity/CancelTransaction.js";
import { MessageSucess } from "../../3-Domain/Util/MessageSuccess.js";

export class CancelReversalTransaction{

    constructor(private readonly gateway : IGateways,
                private readonly repositoryTransaction: ITransactionRepository,
                private readonly repositoryLog: ILogRepository,
                private readonly mail: IMail){}

    async execute(numberRequest:string): Promise<CancelTransaction>{

        try {
                   
            return this.gateway.cancelReversalTransaction(numberRequest);
                
        } catch (error) {
            throw new Error(MessageSucess.generateMessage('Erro enviado Transição'));
        }
    }
}