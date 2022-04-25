import { IGateways } from '../../Shared/Interfaces/Gateway/IGateways';
import { ILogRepository } from '../../Shared/Interfaces/Repository/ILogRepository';
import { Action } from '../../Domain/Entity/Log/Action';
import { LogFactory } from '../../Domain/Entity/Log/LogFactory';
import { SearchTransactionOrder } from '../../Domain/Entity/Transaction/SearchTransactionOrder';
import { SearchTransactionDTO } from '../../Shared/DTO/SearchTransactionDTO';

export class SearchTransaction {
    constructor(private readonly gateway: IGateways, private readonly repositoryLog: ILogRepository) {}

    public async execute(searchRequest: SearchTransactionDTO): Promise<SearchTransactionOrder> {
        try {
            const searchTransactionDTO = await this.gateway.searchTransaction(searchRequest);
            console.log(JSON.stringify(searchTransactionDTO));
            const searchTransaction = SearchTransactionOrder.createForDTO(searchTransactionDTO);
            await this.repositoryLog.save(LogFactory.register(Action.SEARCH.toString()));
            console.log(JSON.stringify(searchTransaction));
            return searchTransaction;
        } catch (error) {
            throw new Error(error);
        }
    }
}
