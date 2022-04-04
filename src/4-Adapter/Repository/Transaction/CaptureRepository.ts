import { Capture } from '../../../3-Domain/Entity/Transaction/Capture';
import { ICaptureRepository } from '../../../5-Shared/Interfaces/Repository/ICaptureRepository';

export class CaptureRepository implements ICaptureRepository {
    save(capture: Capture): Promise<any> {
        return new Promise(function (resolve) {
            resolve(console.log('...salvando caputure'));
        });
    }
}
