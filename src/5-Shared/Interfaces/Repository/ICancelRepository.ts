import { RefundOrder } from '../../../3-Domain/Entity/Transaction/RefundOrder';

export interface ICancelRepository {
    save(capture: RefundOrder): Promise<any>;
}
