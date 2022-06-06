import { MigrationInterface, QueryRunner } from 'typeorm';

export class Capture1654513784257 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE Capture (
            id varchar(250),
            numberRequest VARCHAR(250),
            amount float,
            data Date,
            nsu VARCHAR(250),
            authorizationCode VARCHAR(250)
        ); `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP table Capture`);
    }
}
