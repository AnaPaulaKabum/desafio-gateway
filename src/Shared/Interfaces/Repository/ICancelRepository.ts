import { RefundOrder } from '../../../Domain/Entity/Transaction/RefundOrder';

export interface ICancelRepository {
    save(capture: RefundOrder): Promise<any>;
}
