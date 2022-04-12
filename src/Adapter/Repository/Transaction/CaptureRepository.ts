import { CaptureOrder } from '../../../Domain/Entity/Transaction/ValueObject/CaptureOrder';
import { ICaptureRepository } from '../../../Shared/Interfaces/Repository/ICaptureRepository';

export class CaptureRepository implements ICaptureRepository {
    save(capture: CaptureOrder): Promise<any> {
        return new Promise(function (resolve) {
            resolve(console.log('...salvando caputure'));
        });
    }
}
