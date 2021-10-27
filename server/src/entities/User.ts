import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany, ManyToOne, JoinColumn, ManyToMany } from "typeorm";
import { Exclude } from "class-transformer";
import { Role } from "./Role";
import { Card } from "./Card";
import { Game } from "./Game";
import { Buy } from "./Buy";
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

    // Refresh Token Relationship
    @Exclude()
    @Column({ nullable: true })
    refresh_token: string;

    @OneToOne(() => RefreshToken, refreshToken => refreshToken.user) 
    refreshToken: RefreshToken;

    // Card Relationship
    @OneToMany(() => Card, card => card.user)    
    cards: Card[];

    @Column()
    role_id: string
    @ManyToOne(() => Role, role => role.users)
    @JoinColumn({ name: 'role_id' })
    role: Role;

    @ManyToMany(() => Game, game => game.users)
    @JoinColumn({ name: 'game_id' })
    games: Game[];

    @OneToMany(() => Buy, buy => buy.buyer)    
    buysBuyer: Buy[];

    @OneToMany(() => Buy, buy => buy.receiver)    
    buysReceiver: Buy[];

    constructor() {
        if(!this.id) {
            this.id = uuid()
        }
    }
}

export { User };