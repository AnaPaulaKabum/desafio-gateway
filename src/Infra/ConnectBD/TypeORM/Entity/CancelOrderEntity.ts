import 'reflect-metadata';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Cancel' })
export class CancelOrderEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    numberRequest: string;

    @Column()
    date: Date;

    @Column()
    amount: number;

    @Column()
    tid: string;

    @Column()
    nsu: string;

    @Column()
    authorizationCode: string;
}
