import { Entity, Column, ManyToMany, JoinColumn } from "typeorm";
import { Game } from "./Game";

import { BaseEntity } from "./BaseEntity";

@Entity("categories")
class Category extends BaseEntity {
    @Column()
    name: string;

    @ManyToMany(() => Game, game => game.categories)
    @JoinColumn({ name: 'game_id' })
    games: Game[];
}

export { Category };