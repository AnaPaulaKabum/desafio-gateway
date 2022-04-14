import { CancelOrder } from '../../../Domain/Entity/Transaction/ValueObject/CancelOrder';

export interface ICancelRepository {
    save(capture: CancelOrder): Promise<any>;
}
