import { StatusTransaction } from "../Core/Interfaces/Transaction/Enum/StatusTransaction.js";
import { ITransaction } from "../Core/Interfaces/Transaction/ITransaction.js";
import { ITransactionRepository } from "../Core/Interfaces/Transaction/ITransitionRepository.js";

export class Transaction implements ITransaction{

    numberRequest: string;
    kind: TypeTransaction;
    amount: number;
    installments: number;
    cardholderName: string;
    cardNumber: string;
    expirationMonth: number;
    expirationYear: number;
    securityCode: string;
    softDescriptor: string;

    isValidToSend(repository: ITransactionRepository){

        console.log('..Entity')
        const status = repository.searchStatus(this.numberRequest);
        return status === StatusTransaction.READY
    }
}