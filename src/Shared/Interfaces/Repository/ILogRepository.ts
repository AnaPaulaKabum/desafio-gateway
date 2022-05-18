import { Log } from '../../../Domain/Entity/Log/Log';

export interface ILogRepository {
    register(log: Log): Promise<any>;
}
