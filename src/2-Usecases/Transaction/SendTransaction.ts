import { IGateways } from '../../5-Shared/Interfaces/Gateway/IGateways';
import { IMail } from '../../5-Shared/Interfaces/Mail/IMail';
import { ILogRepository } from '../../5-Shared/Interfaces/Repository/ILogRepository';
import { ITransactionRepository } from '../../5-Shared/Interfaces/Repository/ITransitionRepository';
import { FieldMail } from '../../3-Domain/Entity/Mail/FieldMail';
import { TransactionOrder } from '../../3-Domain/Entity/Transaction/TransactionOrder';
import { Action } from '../../3-Domain/Entity/Log/Action';
import { LogFactory } from '../../3-Domain/Entity/Log/LogFactory';
import { TransactionDTO } from '../../5-Shared/DTO/TransactionDTO';
import { ParamValidateType } from '../../5-Shared/Interfaces/Gateway/ParamValidateType';
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
            console.log('..SendTransaction(UseCases)');

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
