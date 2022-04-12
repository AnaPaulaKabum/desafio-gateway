import { CaptureOrder } from '../../../3-Domain/Entity/Transaction/CaptureOrder';

export interface ICaptureRepository {
    save(capture: CaptureOrder): Promise<any>;
}
