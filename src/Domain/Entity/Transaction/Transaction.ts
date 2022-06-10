import { TypeTransaction } from '../../Shared/Enum/TypeTransaction.enum';
import { Amount } from '../../ValueObject/Transaction/Amount';
import { Installments } from '../../ValueObject/Transaction/Installments';
import { NumberRequest } from '../../ValueObject/Transaction/NumberRequest';
import { SoftDescriptor } from '../../ValueObject/Transaction/SoftDescriptor';
import { Card } from './Card';

export class Transaction {
    constructor(
        public numberRequest: NumberRequest,
        public installments: Installments,
        public amount: Amount,
        public softDescriptor: SoftDescriptor,
        public kind: TypeTransaction,
        public card: Card,
    ) {}
}
