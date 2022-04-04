import { CancelTransaction } from '../../../3-Domain/Entity/Transaction/CancelTransaction.js';

export interface ICancelRepository {
    save(capture: CancelTransaction): Promise<any>;
}
