import { MigrationInterface, QueryRunner } from "typeorm";

export class  $gym1713259712288 implements MigrationInterface {
    name = ' $gym1713259712288'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "role" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contact" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "contact" character varying NOT NULL, CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "personal" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying, "passwordHash" character varying NOT NULL, "roleIdId" uuid, CONSTRAINT "UQ_b917959de226dd212ff32467ba0" UNIQUE ("login"), CONSTRAINT "REL_ca2b12a2917bb137a6752252a2" UNIQUE ("roleIdId"), CONSTRAINT "PK_7a849a61cdfe8eee39892d7b1b1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refresh" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user" character varying NOT NULL, "expires" TIMESTAMP NOT NULL, "is_revoked" boolean NOT NULL, CONSTRAINT "PK_9367d4d8c769c16ad5200ad86d4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cms" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "CMS" character varying NOT NULL, CONSTRAINT "PK_beb81752e4f627d4ab498fc60c1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "personal" ADD CONSTRAINT "FK_ca2b12a2917bb137a6752252a22" FOREIGN KEY ("roleIdId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "personal" DROP CONSTRAINT "FK_ca2b12a2917bb137a6752252a22"`);
        await queryRunner.query(`DROP TABLE "cms"`);
        await queryRunner.query(`DROP TABLE "refresh"`);
        await queryRunner.query(`DROP TABLE "personal"`);
        await queryRunner.query(`DROP TABLE "contact"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
