import { Entity, Column, OneToOne, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { User } from "./User";
import { Category } from "./Category";
import { Buy } from "./Buy";
import { RequestUser } from "./RequestUser";

import { BaseEntity } from "./BaseEntity";

@Entity("games")
class Game extends BaseEntity {
    @Column()
    name: string;

    @Column()
    price: number;

    @Column({ default: true })
    is_pending: boolean;

    @Column()
    description: string;
    
    @Column()
    release: Date 

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

    @OneToOne(() => RequestUser, request => request.game) 
    request: RequestUser;
}

export { Game };