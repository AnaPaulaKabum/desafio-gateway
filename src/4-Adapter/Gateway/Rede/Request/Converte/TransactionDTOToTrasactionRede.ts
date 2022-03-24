import { TransactionDTO } from "../../../../../5-Shared/DTO/TransactionDTO.js";
import { TransactionRedeCreateRequest } from "../TransactionRedeCreateRequest.js";

export abstract class TransactionDTOToTrasactionRede{

    static generate(Transaction: TransactionDTO):TransactionRedeCreateRequest{

        let transactionRede =  new TransactionRedeCreateRequest();

        transactionRede.numberRequest   = Transaction.numberRequest;
        transactionRede.kind            = Transaction.kind;
        transactionRede.amount          = Transaction.amount;
        transactionRede.installments    = Transaction.installments;
        transactionRede.cardholderName  = Transaction.cardholderName;
        transactionRede.cardNumber      = Transaction.cardNumber;
        transactionRede.expirationMonth = Transaction.expirationMonth;
        transactionRede.expirationYear  = Transaction.expirationYear;
        transactionRede.securityCode    = Transaction.securityCode;
        transactionRede.softDescriptor  = Transaction.softDescriptor;
        
        return transactionRede
    }
}