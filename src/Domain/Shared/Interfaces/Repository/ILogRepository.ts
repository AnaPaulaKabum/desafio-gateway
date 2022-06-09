import { Log } from '../../../Entity/Log/Log';

export interface ILogRepository {
    register(log: Log): Promise<any>;
}
