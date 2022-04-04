import { Capture } from '../../../3-Domain/Entity/Transaction/Capture.js';

export interface ICaptureRepository {
    save(capture: Capture): Promise<any>;
}
