import { MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateRole1634862219892 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        
        await queryRunner.createTable(
            new Table({
                name: 'roles',
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
                        name: "label",
                        type: "varchar"
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
            })
        ); 
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("roles");
        await queryRunner.query('DROP EXTENSION "uuid-ossp"');
    }

}
