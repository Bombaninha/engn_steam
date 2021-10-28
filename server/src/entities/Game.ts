import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne, JoinColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { User } from "./User";
import { v4 as uuid } from "uuid";
import { Category } from "./Category";
import { Buy } from "./Buy";
import { Request } from "./Request";

@Entity("games")
class Game {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column({ default: true })
    is_pending: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToMany(() => Category, category => category.games)
    @JoinTable({
        name: "games_categories",
        joinColumn: {
            name: "game_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "category_id",
            referencedColumnName: "id"
        }
    })
    categories: Category[];

    @ManyToMany(() => User, user => user.games)
    @JoinTable({
        name: "games_developers",
        joinColumn: {
            name: "game_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "user_id",
            referencedColumnName: "id"
        }
    })
    users: User[];
    
    @OneToMany(() => Buy, buy => buy.game)    
    buys: Buy[];

    @OneToOne(() => Request, request => request.game) 
    request: Request;

    constructor() {
        if(!this.id) {
            this.id = uuid()
        }
    }
}

export { Game };