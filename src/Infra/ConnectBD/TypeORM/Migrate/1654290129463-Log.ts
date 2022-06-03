import { MigrationInterface, QueryRunner } from 'typeorm';

export class Log1654290129463 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE Log (
            user INT NULL,
            descripto varchar(255) NULL,
            process INT NULL,
            gravity INT NULL
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP table Log`);
    }
}
