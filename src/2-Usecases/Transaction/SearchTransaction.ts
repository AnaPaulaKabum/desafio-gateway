import { IGateways } from '../../3-Domain/Core/Interfaces/IGateways.js';
import { ILogRepository } from '../../3-Domain/Core/Interfaces/Transaction/Repository/ILogRepository.js';
import { Transaction } from '../../3-Domain/Entity/Transaction.js';
import { Action } from '../../3-Domain/Util/Action.js';
import { LogFactory } from '../../3-Domain/Util/LogFactory.js';

export class SearchTransaction {
    constructor(private readonly gateway: IGateways, private readonly repositoryLog: ILogRepository) {}

    public execute(numberRequest: string): Promise<Transaction> {
        try {
            const resultado = this.gateway.searchTransaction(numberRequest);
            this.repositoryLog.save(LogFactory.success(Action.SEARCH.toString()));
            return resultado;
        } catch (error) {
            throw new Error(error);
        }
    }
}
