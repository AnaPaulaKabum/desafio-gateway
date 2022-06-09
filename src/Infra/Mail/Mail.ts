import { IMail } from '../../Domain/Shared/Interfaces/Mail/IMail';
import { FieldMail } from '../../Domain/Entity/Mail/FieldMail';

export class Mail implements IMail {
    send(fieldMail: FieldMail): Promise<any> {
        return new Promise(function (resolve) {
            resolve(null);
        });
    }
}
