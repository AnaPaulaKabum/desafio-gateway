import { CancelOrder } from '../../../Domain/Entity/Transaction/ValueObject/CancelOrder';
import { ICancelRepository } from '../../../Shared/Interfaces/Repository/ICancelRepository';

export class CancelRepository implements ICancelRepository {
    save(capture: CancelOrder): Promise<any> {
        return new Promise(function (resolve) {
            resolve(console.log('...salvando cancel transaction'));
        });
    }
}
