import { Log } from '../../../Domain/Entity/Log/Log';

export interface ILogRepository {
    save(log: Log): Promise<any>;
}
