import { Log } from './Log';
import { StatusLog } from '../../../Shared/Enum/StatusLog';

export abstract class LogFactory {
    static success(message: string): Log {
        let log = new Log();
        log.message = message;
        log.statusLog = StatusLog.SUCCESS;
        log.user = 'root';
        log.date = new Date();

        return log;
    }

    static error(message: string): Log {
        let log = new Log();
        log.message = message;
        log.statusLog = StatusLog.ERROR;
        log.user = 'root';
        log.date = new Date();

        return log;
    }

    static register(message: string): Log {
        let log = new Log();
        log.message = message;
        log.statusLog = StatusLog.REGISTER;
        log.user = 'root';
        log.date = new Date();

        return log;
    }
}
