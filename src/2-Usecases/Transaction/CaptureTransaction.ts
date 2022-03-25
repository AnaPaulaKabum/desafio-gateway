import { IGateways } from '../../3-Domain/Core/Interfaces/IGateways.js';
import { IMail } from '../../3-Domain/Core/Interfaces/IMail.js';
import { StatusTransaction } from '../../3-Domain/Core/Interfaces/Transaction/Enum/StatusTransaction.js';
import { ILogRepository } from '../../3-Domain/Core/Interfaces/Transaction/Repository/ILogRepository.js';
import { ITransactionRepository } from '../../3-Domain/Core/Interfaces/Transaction/Repository/ITransitionRepository.js';
import { Log } from '../../3-Domain/Entity/Log.js';
import { Transaction } from '../../3-Domain/Entity/Transaction.js';
import { MessageSucess } from '../../3-Domain/Util/MessageSuccess.js';

export class CaptureTransaction {
    constructor(
        private readonly gateway: IGateways,
        private readonly repositoryTransaction: ITransactionRepository,
        private readonly repositoryLog: ILogRepository,
        private readonly mail: IMail,
    ) {}

    public execute(numberRequest: string, amount: number): Promise<Transaction> {
        try {
            console.log('..SendTransaction(UseCases)');

            if (this.isValidToCapture(numberRequest)) {
                const captureTranstion = this.gateway.captureTransaction(numberRequest, amount);
                this.repositoryLog.save(
                    new Log(MessageSucess.generateMessage('Erro enviada Transação'), 'admin', new Date()),
                );
                return captureTranstion;
            }

            throw new Error('Trasação não pode ser capturada.');
        } catch (error) {
            console.log(error);
            this.mail.send();
            this.repositoryLog.save(
                new Log(MessageSucess.generateMessage('Erro enviada Transação'), 'admin', new Date()),
            );
            throw new Error(MessageSucess.generateMessage('Erro enviado Transição'));
        }
    }

    private isValidToCapture(numberRequest: string) {
        const status = this.repositoryTransaction.searchStatus(numberRequest);
        return status === StatusTransaction.NO_CAPTURE;
    }
}
