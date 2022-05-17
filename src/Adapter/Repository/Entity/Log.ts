import 'reflect-metadata';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Log' })
export class LogBD {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userCode: number;

    @Column()
    descripto: string;

    @Column()
    process: number;

    @Column()
    gravity: number;

    @Column()
    date: Date;
}
