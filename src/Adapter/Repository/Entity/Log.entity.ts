import 'reflect-metadata';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity({ name: 'Log' })
export class LogEntity extends BaseEntity {
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
