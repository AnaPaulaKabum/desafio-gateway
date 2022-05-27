import { IGateways } from '../../Shared/Interfaces/Gateway/IGateways';
import { IMail } from '../../Shared/Interfaces/Mail/IMail';
import { ILogRepository } from '../../Shared/Interfaces/Repository/ILogRepository';
import { ITransactionRepository } from '../../Shared/Interfaces/Repository/ITransitionRepository';
import { FieldMail } from '../../Domain/Entity/Mail/FieldMail';
import { TransactionOrder } from '../../Domain/Entity/Transaction/TransactionOrder';
import { Action } from '../../Domain/Entity/Log/Action';
import { LogFactory } from '../../Domain/Entity/Log/LogFactory';
import { TransactionDTOType } from '../../Shared/DTO/TransactionDTOType';
import { ParamValidateType } from '../../Shared/Interfaces/Gateway/ParamValidateType';
import { ValidateParam } from './Validate/ValidateParam';
import { StatusTransaction } from '../../Shared/Enum/StatusTransaction';

export class SendTransaction {
    constructor(
        private readonly gateway: IGateways,
        private readonly configGateway: ParamValidateType,
        private readonly repositoryTransaction: ITransactionRepository,
        private readonly repositoryLog: ILogRepository,
        private readonly mail: IMail,
    ) {}

    async execute(transaction: TransactionDTOType): Promise<TransactionOrder> {
        try {
            ValidateParam.isValidSend(this.configGateway, transaction);

            if (await this.isValidToSend(transaction.numberRequest)) {
                const transactionDTO = await this.gateway.sendTransaction(transaction);

                const transactionOrder = TransactionOrder.createForDTO(transactionDTO);
                await this.repositoryTransaction.saveTransaction(transactionOrder);
                await this.repositoryLog.register(LogFactory.success(Action.SEND.toString()));

                return transactionOrder;
            }

            throw new Error('Transação já cadastrada');
        } catch (error) {
            await this.mail.send(new FieldMail(error));
            await this.repositoryLog.register(LogFactory.error(Action.SEND.toString() + error));
            throw new Error(error);
        }
    }

    private async isValidToSend(numberRequest: string): Promise<boolean> {
        const status = await this.repositoryTransaction.searchStatus(numberRequest);

        return new Promise(function (resolve) {
            resolve(status !== StatusTransaction.FINNALY);
        });
    }
}
