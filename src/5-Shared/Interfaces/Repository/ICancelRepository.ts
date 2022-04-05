import { Refund } from '../../../3-Domain/Entity/Transaction/Refund';

export interface ICancelRepository {
    save(capture: Refund): Promise<any>;
}
