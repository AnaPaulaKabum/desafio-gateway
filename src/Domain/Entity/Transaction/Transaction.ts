import { Amount } from './ValueObject/Transaction/Amount';
import { Installments } from './ValueObject/Transaction/Installments';
import { NumberRequest } from './ValueObject/Transaction/NumberRequest';
import { SoftDescriptor } from './ValueObject/Transaction/SoftDescriptor';

export class Transaction {
    constructor(
        numberRequest: NumberRequest,
        installments: Installments,
        amount: Amount,
        softDescriptor: SoftDescriptor,
    ) {}
}
