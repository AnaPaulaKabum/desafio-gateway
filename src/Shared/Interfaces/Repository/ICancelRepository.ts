import { RefundOrder } from '../../../Domain/Entity/Transaction/ValueObject/RefundOrder';

export interface ICancelRepository {
    save(capture: RefundOrder): Promise<any>;
}
