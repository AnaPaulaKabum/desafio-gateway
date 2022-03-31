import { TypeTransaction } from '../../../../../5-Shared/Enum/TypeTransaction.enum.js';
import { Transaction } from '../../../../../3-Domain/Entity/Transaction/Transaction.js';
import { CaptureCieloTransaction } from '../../Response/CaptureCieloTransactionResponse.js';
import { plainToInstance } from 'class-transformer';
import { TransactionCieloCaptureRequest } from '../../Request/TransactionCieloCaptureRequest.js';
import { Capture } from '../../../../../3-Domain/Entity/Transaction/Capture.js';

export abstract class ResponseAPICieloToCaptureTransaction {
    static converte(Json: any, transactionCieloCaptureRequest: TransactionCieloCaptureRequest): Capture {
        let object = plainToInstance(CaptureCieloTransaction, Json);
        let capture = new Capture();

        capture.amount = transactionCieloCaptureRequest.amount;
        capture.numberRequest = transactionCieloCaptureRequest.paymentId;
        capture.nsu = object.ProofOfSale;
        capture.date = new Date();

        capture.isValid();
        return capture;
    }
}
