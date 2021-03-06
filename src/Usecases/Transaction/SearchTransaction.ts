import { IGateways } from '../../Domain/Shared/Interfaces/Gateway/IGateways';
import { ILogRepository } from '../../Domain/Shared/Interfaces/Repository/ILogRepository';
import { Action } from '../../Domain/Entity/Log/Action';
import { LogFactory } from '../../Domain/Entity/Log/LogFactory';
import { SearchTransactionOrder } from '../../Domain/Common/Transaction/SearchTransactionOrder';
import { SearchTransactionDTOType } from '../../Domain/Shared/DTO/SearchTransactionDTOType';

export class SearchTransaction {
    constructor(private readonly gateway: IGateways, private readonly repositoryLog: ILogRepository) {}

    public async execute(searchTransactionDTOType: SearchTransactionDTOType): Promise<SearchTransactionOrder> {
        try {
            const searchTransactionDTO = await this.gateway.searchTransaction(searchTransactionDTOType);
            const searchTransaction = SearchTransactionOrder.createForDTO(searchTransactionDTO);
            await this.repositoryLog.register(LogFactory.register(Action.SEARCH.toString()));
            return searchTransaction;
        } catch (error) {
            throw new Error(error);
        }
    }
}
