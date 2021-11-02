import { Entity, Column, OneToMany } from "typeorm";
import { Request } from "./Request";

import { BaseEntity } from "./BaseEntity";

@Entity("request_types")
class RequestType extends BaseEntity {

    @Column({ unique: true })
    name: string;

    @OneToMany(() => Request, request => request.requestType)    
    requests: Request[];

}

export { RequestType };