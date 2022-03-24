import { StatusTransaction } from "../../../3-Domain/Core/Interfaces/Transaction/Enum/StatusTransaction.js";
import { ITransactionRepository } from "../../../3-Domain/Core/Interfaces/Transaction/Repository/ITransitionRepository.js";

export class TransactionRepository implements ITransactionRepository{

    searchStatus(numberRequest: string): StatusTransaction {
       
        return StatusTransaction.READY;
    }
}