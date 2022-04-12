import { IGateways } from '../../Shared/Interfaces/Gateway/IGateways';
import { IMail } from '../../Shared/Interfaces/Mail/IMail';
import { ILogRepository } from '../../Shared/Interfaces/Repository/ILogRepository';
import { ITransactionRepository } from '../../Shared/Interfaces/Repository/ITransitionRepository';
import { FieldMail } from '../../Domain/Entity/Mail/FieldMail';
import { TransactionOrder } from '../../Domain/Entity/Transaction/ValueObject/TransactionOrder';
import { Action } from '../../Domain/Entity/Log/Action';
import { LogFactory } from '../../Domain/Entity/Log/LogFactory';
import { TransactionDTO } from '../../Shared/DTO/TransactionDTO';
import { ParamValidateType } from '../../Shared/Interfaces/Gateway/ParamValidateType';
import { ValidateParam } from './Validate/ValidateParam';

export class SendTransaction {
    constructor(
        private readonly gateway: IGateways,
        private readonly configGateway: ParamValidateType,
        private readonly repositoryTransaction: ITransactionRepository,
        private readonly repositoryLog: ILogRepository,
        private readonly mail: IMail,
    ) {}

    async execute(transaction: TransactionDTO): Promise<TransactionOrder> {
        try {
            ValidateParam.isValidSend(this.configGateway, transaction);

            if (await this.isValidToSend(transaction.numberRequest)) {
                const transactionResult = await this.gateway.sendTransaction(transaction);
                await this.repositoryTransaction.save(transactionResult);
                await this.repositoryLog.save(LogFactory.success(Action.SEND.toString()));

                return transactionResult;
            }

            throw new Error('Transação já cadastrada');
        } catch (error) {
            await this.mail.send(new FieldMail(error));
            this.repositoryLog.save(LogFactory.error(Action.SEND.toString() + error));
            throw new Error(error);
        }
    }

    private async isValidToSend(numberRequest: string) {
        const status = await this.repositoryTransaction.searchStatus(numberRequest);
        //return status === StatusTransaction.NO_REGISTER;
        return true;
    }
}
