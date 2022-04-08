import { CaptureOrder } from '../../../3-Domain/Entity/Transaction/CaptureOrder.js';

export interface ICaptureRepository {
    save(capture: CaptureOrder): Promise<any>;
}
