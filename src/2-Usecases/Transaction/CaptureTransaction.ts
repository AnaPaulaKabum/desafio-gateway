import { IGateways } from '../../5-Shared/Interfaces/Gateway/IGateways.js';
import { IMail } from '../../5-Shared/Interfaces/Mail/IMail.js';
import { StatusTransaction } from '../../5-Shared/Enum/StatusTransaction.js';
import { ILogRepository } from '../../5-Shared/Interfaces/Repository/ILogRepository.js';
import { ITransactionRepository } from '../../5-Shared/Interfaces/Repository/ITransitionRepository.js';
import { FieldMail } from '../../3-Domain/Entity/Mail/FieldMail.js';
import { Action } from '../../3-Domain/Entity/Transaction/Action.js';
import { LogFactory } from '../../3-Domain/Entity/Log/LogFactory.js';
import { Capture } from '../../3-Domain/Entity/Transaction/Capture.js';

export class CaptureTransaction {
    constructor(
        private readonly gateway: IGateways,
        private readonly repositoryTransaction: ITransactionRepository,
        private readonly repositoryLog: ILogRepository,
        private readonly mail: IMail,
    ) {}

    public async execute(numberRequest: string, amount: number): Promise<Capture> {
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
