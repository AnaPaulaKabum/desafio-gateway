import { RefundOrder } from '../../../Domain/Entity/Transaction/ValueObject/RefundOrder';
import { ICancelRepository } from '../../../Shared/Interfaces/Repository/ICancelRepository';

export class CancelRepository implements ICancelRepository {
    save(capture: RefundOrder): Promise<any> {
        return new Promise(function (resolve) {
            resolve(console.log('...salvando cancel transaction'));
        });
    }
}
