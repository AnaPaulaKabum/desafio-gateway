import { IMail } from '../../3-Domain/Core/Interfaces/IMail';
import { FieldMail } from '../../3-Domain/Entity/Mail/FieldMail';

export class Mail implements IMail {
    send(fieldMail: FieldMail): Promise<any> {
        console.log('...MAIL: Enviado email');

        return new Promise(function (resolve) {
            resolve(null);
        });
    }
}
