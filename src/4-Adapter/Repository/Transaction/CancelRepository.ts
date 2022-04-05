import { Refund } from '../../../3-Domain/Entity/Transaction/Refund.js';
import { ICancelRepository } from '../../../5-Shared/Interfaces/Repository/ICancelRepository.js';

export class CancelRepository implements ICancelRepository {
    save(capture: Refund): Promise<any> {
        return new Promise(function (resolve) {
            resolve(console.log('...salvando cancel transaction'));
        });
    }
}
