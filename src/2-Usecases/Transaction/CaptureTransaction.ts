import { IGateways } from '../../3-Domain/Core/Interfaces/IGateways.js';
import { IMail } from '../../3-Domain/Core/Interfaces/IMail.js';
import { StatusTransaction } from '../../3-Domain/Core/Interfaces/Transaction/Enum/StatusTransaction.js';
import { ILogRepository } from '../../3-Domain/Core/Interfaces/Transaction/Repository/ILogRepository.js';
import { ITransactionRepository } from '../../3-Domain/Core/Interfaces/Transaction/Repository/ITransitionRepository.js';
import { FieldMail } from '../../3-Domain/Entity/Mail/FieldMail.js';
import { Log } from '../../3-Domain/Entity/Log/Log.js';
import { Transaction } from '../../3-Domain/Entity/Transaction/Transaction.js';
import { Action } from '../../3-Domain/Util/Action.js';
import { LogFactory } from '../../3-Domain/Util/LogFactory.js';

export class CaptureTransaction {
    constructor(
        private readonly gateway: IGateways,
        private readonly repositoryTransaction: ITransactionRepository,
        private readonly repositoryLog: ILogRepository,
        private readonly mail: IMail,
    ) {}

    public async execute(numberRequest: string, amount: number): Promise<Transaction> {
        try {
            console.log('..SendTransaction(UseCases)');

            if (await this.isValidToCapture(numberRequest)) {
                const captureTranstion = this.gateway.captureTransaction(numberRequest, amount);
                await this.repositoryLog.save(LogFactory.success(Action.CAPTURE.toString()));
                return captureTranstion;
            }

            throw new Error('Trasação não pode ser capturada.');
        } catch (error) {
            this.mail.send(new FieldMail(error));
            await this.repositoryLog.save(LogFactory.error(Action.CAPTURE.toString()));
            throw new Error(error);
        }
    }

    private async isValidToCapture(numberRequest: string): Promise<boolean> {
        const status = await this.repositoryTransaction.searchStatus(numberRequest);
        return status === StatusTransaction.NO_CAPTURE;
    }
}
