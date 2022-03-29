import { Log } from '../../../3-Domain/Entity/Log/Log';

export interface ILogRepository {
    save(log: Log): Promise<any>;
}
