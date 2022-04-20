import { FieldMail } from '../../../Domain/Entity/Mail/FieldMail';
import { IMail } from '../../../Shared/Interfaces/Mail/IMail';

export class MailMock implements IMail {
    send(fieldMail: FieldMail): Promise<any> {
        throw new Error('Method not implemented Mail - send');
    }
}
