import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUser1634862395081 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: "name",
                        type: "varchar"
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isUnique: true
                    },
                    {
                        name: "password",
                        type: "varchar"
                    },
                    {
                        name: "pending_password",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "redefine_password_token",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "roleId",
                        type: "uuid"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "NOW()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "NOW()"
                    }
                ],
                foreignKeys: [
                    {
                      name: "roleUser",
                      referencedTableName: "roles",
                      referencedColumnNames: ["id"],
                      columnNames: ["roleId"],
                      onDelete: "CASCADE",
                      onUpdate: "CASCADE"
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
        await queryRunner.query('DROP EXTENSION "uuid-ossp"');        
    }

}
