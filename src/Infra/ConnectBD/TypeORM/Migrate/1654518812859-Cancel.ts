import { MigrationInterface, QueryRunner } from 'typeorm';

export class Cancel1654518812859 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`CREATE TABLE Cancel (
            id varchar(250),
            numberRequest VARCHAR(250),
            date Date,
            amount float,
            tid VARCHAR(250),
            nsu VARCHAR(250),
            authorizationCode VARCHAR(250)
        );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP table Cancel`);
    }
}
