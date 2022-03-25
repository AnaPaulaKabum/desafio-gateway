import { StatusTransaction } from '../../../3-Domain/Core/Interfaces/Transaction/Enum/StatusTransaction.js';
import { ITransactionRepository } from '../../../3-Domain/Core/Interfaces/Transaction/Repository/ITransitionRepository.js';
import { Transaction } from '../../../3-Domain/Entity/Transaction.js';

export class TransactionRepository implements ITransactionRepository {
    searchStatus(numberRequest: string): StatusTransaction {
        return StatusTransaction.NO_CAPTURE;
    }

    findOne(numberRequest: string): Transaction {
        return new Transaction();
    }
}
