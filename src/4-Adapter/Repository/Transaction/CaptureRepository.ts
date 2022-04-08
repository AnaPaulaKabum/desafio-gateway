import { CaptureOrder } from '../../../3-Domain/Entity/Transaction/CaptureOrder';
import { ICaptureRepository } from '../../../5-Shared/Interfaces/Repository/ICaptureRepository';

export class CaptureRepository implements ICaptureRepository {
    save(capture: CaptureOrder): Promise<any> {
        return new Promise(function (resolve) {
            resolve(console.log('...salvando caputure'));
        });
    }
}
