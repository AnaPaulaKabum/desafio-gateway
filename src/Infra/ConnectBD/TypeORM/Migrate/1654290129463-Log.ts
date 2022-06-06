import { MigrationInterface, QueryRunner } from 'typeorm';

export class Log1654290129463 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE Log (
            id VARCHAR(250),
            userCode INT NULL,
            descripto varchar(255) NULL,
            process INT NULL,
            date Date
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP table Log`);
    }
}
