import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsAdmin1713110580200 implements MigrationInterface {
    name = 'AddIsAdmin1713110580200'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "isAdmin" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isAdmin"`);
    }

}
