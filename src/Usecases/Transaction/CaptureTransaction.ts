import { IGateways } from '../../Domain/Shared/Interfaces/Gateway/IGateways';
import { IMail } from '../../Domain/Shared/Interfaces/Mail/IMail';
import { StatusTransaction } from '../../Domain/Shared/Enum/StatusTransaction';
import { ILogRepository } from '../../Domain/Shared/Interfaces/Repository/ILogRepository';
import { ITransactionRepository } from '../../Domain/Shared/Interfaces/Repository/ITransitionRepository';
import { FieldMail } from '../../Domain/Entity/Mail/FieldMail';
import { Action } from '../../Domain/Entity/Log/Action';
import { LogFactory } from '../../Domain/Entity/Log/LogFactory';
import { CaptureOrder } from '../../Domain/Common/Transaction/CaptureOrder';
import { CaptureTransactionDTOType } from '../../Domain/Shared/DTO/CaptureTransactionDTOType';

export class CaptureTransaction {
    constructor(
        private readonly gateway: IGateways,
        private readonly repositoryTransaction: ITransactionRepository,
        private readonly repositoryLog: ILogRepository,
        private readonly mail: IMail,
    ) {}

    public async execute(captureDTO: CaptureTransactionDTOType): Promise<CaptureOrder> {
        try {
            if (await this.isValidToCapture(captureDTO.tid)) {
                const captureTranstionDTO = await this.gateway.captureTransaction(captureDTO);
                const captureTransaction = CaptureOrder.createForDTO(captureTranstionDTO);
                await this.repositoryTransaction.updateStatus(captureDTO.tid, StatusTransaction.CAPTURE);
                await this.repositoryTransaction.saveCapture(captureTransaction);
                await this.repositoryLog.register(LogFactory.success(Action.CAPTURE.toString()));
                return captureTransaction;
            }

            throw new Error('Trasação não pode ser capturada.');
        } catch (error) {
            this.mail.send(new FieldMail(error));
            await this.repositoryLog.register(LogFactory.error(Action.CAPTURE.toString()));
            throw new Error(error);
        }
    }

    private async isValidToCapture(tid: string): Promise<boolean> {
        const status = await this.repositoryTransaction.searchStatus(tid);
        return status === StatusTransaction.NO_CAPTURE;
    }
}
