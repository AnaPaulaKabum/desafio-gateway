import { IGateways } from '../../5-Shared/Interfaces/Gateway/IGateways.js';
import { ILogRepository } from '../../5-Shared/Interfaces/Repository/ILogRepository.js';
import { Action } from '../../3-Domain/Entity/Transaction/Action.js';
import { LogFactory } from '../../3-Domain/Entity/Log/LogFactory.js';
import { TransactionComplete } from '../../3-Domain/Entity/Transaction/TransactionComplete.js';
import { SearchRequest } from '../../1-Application/Request/SearchRequest.js';

export class SearchTransaction {
    constructor(private readonly gateway: IGateways, private readonly repositoryLog: ILogRepository) {}

    public async execute(searchRequest: SearchRequest): Promise<TransactionComplete> {
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
