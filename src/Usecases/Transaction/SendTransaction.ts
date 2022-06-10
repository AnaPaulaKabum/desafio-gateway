import { IGateways } from '../../Domain/Shared/Interfaces/Gateway/IGateways';
import { IMail } from '../../Domain/Shared/Interfaces/Mail/IMail';
import { ILogRepository } from '../../Domain/Shared/Interfaces/Repository/ILogRepository';
import { ITransactionRepository } from '../../Domain/Shared/Interfaces/Repository/ITransitionRepository';
import { FieldMail } from '../../Domain/Entity/Mail/FieldMail';
import { TransactionOrder } from '../../Domain/Common/Transaction/TransactionOrder';
import { Action } from '../../Domain/Entity/Log/Action';
import { LogFactory } from '../../Domain/Entity/Log/LogFactory';
import { TransactionDTOType } from '../../Domain/Shared/DTO/TransactionDTOType';
import { StatusTransaction } from '../../Domain/Shared/Enum/StatusTransaction';
import { Transaction } from '../../Domain/Entity/Transaction/Transaction';
import { NumberRequest } from '../../Domain/ValueObject/Transaction/NumberRequest';
import { Installments } from '../../Domain/ValueObject/Transaction/Installments';
import { Amount } from '../../Domain/ValueObject/Transaction/Amount';
import { SoftDescriptor } from '../../Domain/ValueObject/Transaction/SoftDescriptor';
import { Card } from '../../Domain/Entity/Transaction/Card';

export class SendTransaction {
    constructor(
        private readonly gateway: IGateways,
        private readonly repositoryTransaction: ITransactionRepository,
        private readonly repositoryLog: ILogRepository,
        private readonly mail: IMail,
    ) {}

    async execute(transactionDto: TransactionDTOType): Promise<TransactionOrder> {
        try {
            const transaction = new Transaction(
                new NumberRequest(transactionDto.numberRequest),
                new Installments(transactionDto.installments),
                new Amount(transactionDto.amount),
                new SoftDescriptor(transactionDto.softDescriptor),
                transactionDto.kind,
                new Card(
                    transactionDto.cardNumber,
                    transactionDto.cardHolderName,
                    transactionDto.expirationMonth,
                    transactionDto.expirationYear,
                    transactionDto.cardSecurityCode,
                ),
            );

            if (await this.isValidToSend(transaction.numberRequest.value)) {
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
