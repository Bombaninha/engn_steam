import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany, ManyToOne } from "typeorm";
import { Exclude } from "class-transformer";
import { Role } from "./Role";
import { Card } from "./Card";
import { RefreshToken } from "./RefreshToken";
import { v4 as uuid } from "uuid";

@Entity("users")
class User {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Exclude()
    @Column()
    password: string;

    @Exclude()
    @Column({ nullable: true })
    pending_password: string;

    @Exclude()
    @Column({ nullable: true })
    redefine_password_token: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToOne(() => RefreshToken, refreshToken => refreshToken.user)
    refreshToken: RefreshToken;

    @OneToMany(() => Card, card => card.user)    
    cards: Card[];

    @ManyToOne(() => Role, role => role.users)
    role: Role;

    constructor() {
        if(!this.id) {
            this.id = uuid()
        }
    }
}

export { User };