import 'reflect-metadata';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Log' })
export class LogEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userCode: number;

    @Column()
    descripto: string;

    @Column()
    process: number;

    @Column()
    date: Date;
}
