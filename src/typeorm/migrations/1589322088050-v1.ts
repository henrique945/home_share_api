import {MigrationInterface, QueryRunner} from "typeorm";

export class v11589322088050 implements MigrationInterface {
    name = 'v11589322088050'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "message" character varying NOT NULL, "isConfirmed" boolean NOT NULL, "dateConfirmed" TIMESTAMP, "canceled" boolean NOT NULL, "userOwnerId" integer NOT NULL, "userRentId" integer NOT NULL, "propertyId" integer NOT NULL, "userId" integer, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "email" character varying NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "cpf" character varying NOT NULL, "cellphone" character varying NOT NULL, "university" character varying, "roles" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "property" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "street" character varying NOT NULL, "township" character varying NOT NULL, "city" character varying NOT NULL, "description" character varying NOT NULL, "rooms" integer NOT NULL, "pricePerUser" integer NOT NULL, "listImages" text, "userOwnerId" integer NOT NULL, "userId" integer, CONSTRAINT "PK_d80743e6191258a5003d5843b4f" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_605baeb040ff0fae995404cea37" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_e58c3b8c65d0ed30f1ac77260bf" FOREIGN KEY ("propertyId") REFERENCES "property"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "property" ADD CONSTRAINT "FK_d90007b39cfcf412e15823bebc1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "property" DROP CONSTRAINT "FK_d90007b39cfcf412e15823bebc1"`, undefined);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_e58c3b8c65d0ed30f1ac77260bf"`, undefined);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_605baeb040ff0fae995404cea37"`, undefined);
        await queryRunner.query(`DROP TABLE "property"`, undefined);
        await queryRunner.query(`DROP TABLE "users"`, undefined);
        await queryRunner.query(`DROP TABLE "transaction"`, undefined);
    }

}
