import { CaptureOrder } from '../../../Domain/Entity/Transaction/ValueObject/CaptureOrder';

export interface ICaptureRepository {
    save(capture: CaptureOrder): Promise<any>;
}
