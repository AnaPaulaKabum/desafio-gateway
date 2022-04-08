import { RefundOrder } from '../../../3-Domain/Entity/Transaction/RefundOrder.js';
import { ICancelRepository } from '../../../5-Shared/Interfaces/Repository/ICancelRepository.js';

export class CancelRepository implements ICancelRepository {
    save(capture: RefundOrder): Promise<any> {
        return new Promise(function (resolve) {
            resolve(console.log('...salvando cancel transaction'));
        });
    }
}
