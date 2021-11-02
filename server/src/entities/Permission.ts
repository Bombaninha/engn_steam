import { Entity, Column, ManyToMany, JoinColumn } from "typeorm";
import { Role } from "./Role";

import { BaseEntity } from "./BaseEntity";

@Entity("permissions")
class Permission extends BaseEntity {

    @Column()
    name: string;

    @ManyToMany(() => Role, role => role.permissions)
    @JoinColumn({ name: 'role_id' })
    roles: Role[];

}

export { Permission };