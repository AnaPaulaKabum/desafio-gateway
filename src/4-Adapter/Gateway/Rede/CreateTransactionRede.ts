import { TransactionDTO } from "../../../5-Shared/DTO/TransactionDTO.js";
import { TransactionRede } from "./Request/TransactionRede.js";

export abstract class CreateTransactionRede{

    static generate(Transaction: TransactionDTO):TransactionRede{

        let transactionRede =  new TransactionRede();

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