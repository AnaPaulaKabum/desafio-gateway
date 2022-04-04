import { CancelTransaction } from '../../../3-Domain/Entity/Transaction/CancelTransaction.js';
import { ICancelRepository } from '../../../5-Shared/Interfaces/Repository/ICancelRepository.js';

export class CancelRepository implements ICancelRepository {
    save(capture: CancelTransaction): Promise<any> {
        return new Promise(function () {});
    }
}
