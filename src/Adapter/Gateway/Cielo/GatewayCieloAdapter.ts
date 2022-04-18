import { IGateways } from '../../../Shared/Interfaces/Gateway/IGateways';
import { TypeTransaction } from '../../../Shared/Enum/TypeTransaction.enum';
import { TransactionOrder } from '../../../Domain/Entity/Transaction/TransactionOrder';
import { TransactionDTO } from '../../../Shared/DTO/TransactionDTO';
import { MapperSend } from './Mapper/Transaction/MapperSend';
import { MapperTransactionCielo } from './Mapper/Transaction/MapperTransactionCielo';
import { MockAPICaptureCielo } from './Mock/API/MockAPICaptureCielo';
import { MockAPISearchCielo } from './Mock/API/MockAPISearchCielo';
import { MockAPISendCielo } from './Mock/API/MockAPISendCielo';
import { SearchTransactionOrder } from '../../../Domain/Entity/Transaction/SearchTransactionOrder';
import { MapperSearch } from './Mapper/Transaction/MapperSearch';
import { MapperCapture } from './Mapper/Transaction/MapperCapture';
import { CaptureOrder } from '../../../Domain/Entity/Transaction/CaptureOrder';
import { MockAPIReversalCielo } from './Mock/API/MockAPIReversalCielo';
import { MapperCancel } from './Mapper/Transaction/MapperCancel';
import { CancelOrder } from '../../../Domain/Entity/Transaction/CancelOrder';
import { CaptureTransactionDTO } from '../../../Shared/DTO/CaptureTransactionDTO';
import { SearchTransactionDTO } from '../../../Shared/DTO/SearchTransactionDTO';
import { MapperCaptureTrasaction } from './Mapper/Transaction/MapperCaptureTrasaction';
import { TransactionRepository } from '../../Repository/Transaction/TransactionRepository';

export class GatewayCieloAdapter implements IGateways {
    constructor(private readonly transactionRepository: TransactionRepository) {}

    async sendTransaction(transaction: TransactionDTO): Promise<TransactionOrder> {
        if (transaction.kind === TypeTransaction.CREDIT) {
            return this.sendCreditTransaction(transaction);
        }
        return this.sendDebitTransaction(transaction);
    }

    async searchTransaction(searchRequest: SearchTransactionDTO): Promise<SearchTransactionOrder> {
        let returnAPI;

        console.log('xxx' + JSON.stringify(searchRequest));
        if (searchRequest.numberRequest) {
            returnAPI = await MockAPISearchCielo.searchToNumberRequest(searchRequest.numberRequest);
        } else {
            returnAPI = await MockAPISearchCielo.searchToTid(searchRequest.tid);
        }

        return new Promise(function (resolve) {
            resolve(MapperSearch.toTransactionComplete(returnAPI));
        });
    }

    async captureTransaction(captureTransactionDTO: CaptureTransactionDTO): Promise<CaptureOrder> {
        let transactionCaptureRequest = MapperCaptureTrasaction.generate(captureTransactionDTO);
        let returnAPI = await MockAPICaptureCielo.captureTotal(transactionCaptureRequest);

        return new Promise(function (resolve) {
            resolve(MapperCapture.toCapture(returnAPI, captureTransactionDTO));
        });
    }

    async cancelTransaction(numberRequest: string): Promise<CancelOrder> {
        const returnAPI = await MockAPIReversalCielo.cancel(numberRequest);
        const transaction = await this.transactionRepository.findOne(numberRequest);

        return new Promise(function (resolve) {
            resolve(MapperCancel.toCancelTransaction(returnAPI, transaction));
        });
    }

    private async sendCreditTransaction(transaction: TransactionDTO): Promise<TransactionOrder> {
        const transactionRedeRequest = MapperTransactionCielo.generateCredit(transaction);
        const returnAPI = await MockAPISendCielo.sendCredit(transactionRedeRequest);

        return new Promise(function (resolve) {
            resolve(MapperSend.toTransaction(returnAPI, TypeTransaction.CREDIT));
        });
    }

    private async sendDebitTransaction(transaction: TransactionDTO): Promise<TransactionOrder> {
        const transactionRedeRequest = MapperTransactionCielo.generateDebit(transaction);
        const returnAPI = await MockAPISendCielo.sendDebit(transactionRedeRequest);

        return new Promise(function (resolve) {
            resolve(MapperSend.toTransaction(returnAPI, TypeTransaction.DEBIT));
        });
    }
}
