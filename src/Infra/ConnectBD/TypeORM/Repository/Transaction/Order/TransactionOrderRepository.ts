import { Repository } from 'typeorm';
import { TransactionOrderEntity } from '../../Entity/TransactionOrderEntity';

export class TransactionOrderRepository extends Repository<TransactionOrderEntity> {}
