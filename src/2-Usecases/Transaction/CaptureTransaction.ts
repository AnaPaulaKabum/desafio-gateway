import { IGateways } from '../../5-Shared/Interfaces/Gateway/IGateways';
import { IMail } from '../../5-Shared/Interfaces/Mail/IMail';
import { StatusTransaction } from '../../5-Shared/Enum/StatusTransaction';
import { ILogRepository } from '../../5-Shared/Interfaces/Repository/ILogRepository';
import { ITransactionRepository } from '../../5-Shared/Interfaces/Repository/ITransitionRepository';
import { FieldMail } from '../../3-Domain/Entity/Mail/FieldMail';
import { Action } from '../../3-Domain/Entity/Log/Action';
import { LogFactory } from '../../3-Domain/Entity/Log/LogFactory';
import { CaptureOrder } from '../../3-Domain/Entity/Transaction/CaptureOrder';
import { ICaptureRepository } from '../../5-Shared/Interfaces/Repository/ICaptureRepository';
import { CaptureRequest } from '../../1-Application/Request/CaptureRequest';
import { CaptureTransactionDTO } from '../../5-Shared/DTO/CaptureTransactionDTO';

export class CaptureTransaction {
    constructor(
        private readonly gateway: IGateways,
        private readonly repositoryTransaction: ITransactionRepository,
        private readonly repositoryCapture: ICaptureRepository,
        private readonly repositoryLog: ILogRepository,
        private readonly mail: IMail,
    ) {}

    public async execute(captureDTO: CaptureTransactionDTO): Promise<CaptureOrder> {
        try {
            console.log('..SendTransaction(UseCases)');

            if (await this.isValidToCapture(captureDTO.numberRequest)) {
                const captureTranstion = this.gateway.captureTransaction(captureDTO);
                await this.repositoryTransaction.updateStatus(captureDTO.numberRequest, StatusTransaction.CAPTURE);
                await this.repositoryCapture.save(await captureTranstion);
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
