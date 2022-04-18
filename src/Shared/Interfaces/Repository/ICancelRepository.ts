import { CancelOrder } from '../../../Domain/Entity/Transaction/CancelOrder';

export interface ICancelRepository {
    save(capture: CancelOrder): Promise<any>;
}
