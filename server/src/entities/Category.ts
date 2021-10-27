import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinColumn } from "typeorm";
import { Role } from "./Role";
import { v4 as uuid } from "uuid";
import { Game } from "./Game";

@Entity("categories")
class Category {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToMany(() => Game, game => game.categories)
    @JoinColumn({ name: 'game_id' })
    games: Game[];

    constructor() {
        if(!this.id) {
            this.id = uuid()
        }
    }
}

export { Category };