import { MigrationInterface, QueryRunner } from 'typeorm';

export class Transaction1654287924093 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE Transaction (
            id VARCHAR(250),
            numberRequest VARCHAR(250),
            tid VARCHAR(250),
            kind int,
            status int,
            amount float,
            message VARCHAR(250),
            nsu VARCHAR(250),
            authorizationCode VARCHAR(250),
            installments int,           
            PRIMARY KEY (id)
);`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP table Transaction`);
    }
}
