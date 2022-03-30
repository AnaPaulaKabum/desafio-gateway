import { IGateways } from '../../5-Shared/Interfaces/Gateway/IGateways.js';
import { ILogRepository } from '../../5-Shared/Interfaces/Repository/ILogRepository.js';
import { Transaction } from '../../3-Domain/Entity/Transaction/Transaction.js';
import { Action } from '../../3-Domain/Entity/Transaction/Action.js';
import { LogFactory } from '../../3-Domain/Entity/Log/LogFactory.js';
import { TransactionComplete } from '../../3-Domain/Entity/Transaction/TransactionComplete.js';

export class SearchTransaction {
    constructor(private readonly gateway: IGateways, private readonly repositoryLog: ILogRepository) {}

    public async execute(numberRequest: string): Promise<TransactionComplete> {
        try {
            const resultado = this.gateway.searchTransaction(numberRequest);
            await this.repositoryLog.save(LogFactory.success(Action.SEARCH.toString()));
            return resultado;
        } catch (error) {
            throw new Error(error);
        }
    }
}
