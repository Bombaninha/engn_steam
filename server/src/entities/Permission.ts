import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinColumn } from "typeorm";
import { Role } from "./Role";
import { v4 as uuid } from "uuid";

@Entity("permissions")
class Permission {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToMany(() => Role, role => role.permissions)
    @JoinColumn({ name: 'role_id' })
    roles: Role[];

    constructor() {
        if(!this.id) {
            this.id = uuid()
        }
    }
}

export { Permission };