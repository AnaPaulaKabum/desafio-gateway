import { IGateways } from '../../5-Shared/Interfaces/Gateway/IGateways.js';
import { ILogRepository } from '../../5-Shared/Interfaces/Repository/ILogRepository.js';
import { Action } from '../../3-Domain/Entity/Log/Action.js';
import { LogFactory } from '../../3-Domain/Entity/Log/LogFactory.js';
import { TransactionComplete } from '../../3-Domain/Entity/Transaction/TransactionComplete.js';
import { SearchTransactionDTO } from '../../5-Shared/DTO/SearchTransactionDTO.js';

export class SearchTransaction {
    constructor(private readonly gateway: IGateways, private readonly repositoryLog: ILogRepository) {}

    public async execute(searchRequest: SearchTransactionDTO): Promise<TransactionComplete> {
        try {
            console.log('..SearchTransaction(usescases)');
            const resultado = this.gateway.searchTransaction(searchRequest);
            await this.repositoryLog.save(LogFactory.register(Action.SEARCH.toString()));
            return resultado;
        } catch (error) {
            throw new Error(error);
        }
    }
}
