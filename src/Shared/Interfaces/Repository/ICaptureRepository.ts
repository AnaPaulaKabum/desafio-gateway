import { CaptureOrder } from '../../../Domain/Entity/Transaction/CaptureOrder';

export interface ICaptureRepository {
    save(capture: CaptureOrder): Promise<any>;
}