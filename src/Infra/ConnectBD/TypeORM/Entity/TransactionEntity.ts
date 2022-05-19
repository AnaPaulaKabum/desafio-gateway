import 'reflect-metadata';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity({ name: 'Transaction' })
export class TransactionEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    numberRequest: string;

    @Column()
    tid: string;

    @Column() // 1- credit e 2- debit
    kind: number;

    @Column() //    1- 'no_register', 2- 'no_capture', 3-'capture', 4-'finnaly', 5-'cancel',
    status: number;

    @Column()
    amount: number;

    @Column()
    message: string;

    @Column()
    nsu?: string;

    @Column()
    authorizationCode?: string;

    @Column()
    installments?: number;
}
