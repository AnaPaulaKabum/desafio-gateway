import { IMail } from '../../3-Domain/Core/Interfaces/IMail';
import { FieldMail } from '../../3-Domain/Entity/Mail/FieldMail';

export class Mail implements IMail {
    send(fieldMail: FieldMail): Promise<any> {
        console.log('...MAIL: ' + JSON.stringify(fieldMail));

        return new Promise(function (resolve) {
            resolve(null);
        });
    }
}
