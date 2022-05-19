import 'reflect-metadata';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Capture' })
export class CaptureOrderEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    numberRequest: string;

    @Column()
    amount: number;

    @Column()
    date: Date;

    @Column()
    nsu: string;

    @Column()
    authorizationCode: string;
}
