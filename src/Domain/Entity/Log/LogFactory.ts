import { Log } from './Log';
import { StatusLog } from '../../../Shared/Enum/StatusLog';

export class LogFactory {
    private constructor() {}

    static success(message: string): Log {
        let log = new Log();
        log.message = message;
        log.statusLog = StatusLog.SUCCESS;
        log.userCode = 1;
        log.date = new Date();

        return log;
    }

    static error(message: string): Log {
        let log = new Log();
        log.message = message;
        log.statusLog = StatusLog.ERROR;
        log.userCode = 1;
        log.date = new Date();

        return log;
    }

    static register(message: string): Log {
        let log = new Log();
        log.message = message;
        log.statusLog = StatusLog.REGISTER;
        log.userCode = 1;
        log.date = new Date();

        return log;
    }
}
