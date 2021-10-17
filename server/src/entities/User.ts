import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from "typeorm";
import { Exclude } from "class-transformer";
import { v4 as uuid } from "uuid";
import { Role } from "./Role";

@Entity("users")
class User {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Exclude()
    @Column()
    password: string;

    @Exclude()
    @Column()
    pending_password: string;

    @Exclude()
    @Column()
    redefine_password_token: string;

    @JoinColumn({ name: 'role_id' })
    @ManyToOne(() => Role)
    role: Role;

    @Column()
    role_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuid()
        }
    }
}

export { User };