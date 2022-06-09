import { FieldMail } from '../../../Domain/Entity/Mail/FieldMail';
import { IMail } from '../../../Domain/Shared/Interfaces/Mail/IMail';

export class MailMock implements IMail {
    send(fieldMail: FieldMail): Promise<any> {
        return new Promise(function (resolve) {
            resolve(null);
        });
    }
}
