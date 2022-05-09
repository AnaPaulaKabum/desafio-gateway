import { IGateways } from '../../Shared/Interfaces/Gateway/IGateways';
import { IMail } from '../../Shared/Interfaces/Mail/IMail';
import { StatusTransaction } from '../../Shared/Enum/StatusTransaction';
import { ILogRepository } from '../../Shared/Interfaces/Repository/ILogRepository';
import { ITransactionRepository } from '../../Shared/Interfaces/Repository/ITransitionRepository';
import { FieldMail } from '../../Domain/Entity/Mail/FieldMail';
import { Action } from '../../Domain/Entity/Log/Action';
import { LogFactory } from '../../Domain/Entity/Log/LogFactory';
import { CaptureOrder } from '../../Domain/Entity/Transaction/CaptureOrder';
import { CaptureTransactionDTO } from '../../Shared/DTO/CaptureTransactionDTO';

export class CaptureTransaction {
    constructor(
        private readonly gateway: IGateways,
        private readonly repositoryTransaction: ITransactionRepository,
        private readonly repositoryLog: ILogRepository,
        private readonly mail: IMail,
    ) {}

    public async execute(captureDTO: CaptureTransactionDTO): Promise<CaptureOrder> {
        try {
            if (await this.isValidToCapture(captureDTO.tid)) {
                const captureTranstionDTO = await this.gateway.captureTransaction(captureDTO);
                const captureTransaction = CaptureOrder.createForDTO(captureTranstionDTO);
                await this.repositoryTransaction.updateStatus(captureDTO.tid, StatusTransaction.CAPTURE);
                await this.repositoryTransaction.saveCapture(captureTransaction);
                await this.repositoryLog.save(LogFactory.success(Action.CAPTURE.toString()));
                return captureTransaction;
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
