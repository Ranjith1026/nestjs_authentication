import {Column, Entity, PrimaryGeneratedColumn, PrimaryColumn} from "typeorm";

@Entity('det')
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
    unique: true,
    nullable: false,
    })
    username:string;

    @Column({
       unique: true,
        nullable: false,
    })
    email:string;

    @Column({ nullable: false})
    firstname:string;

    @Column({ nullable: false})
    lastname:string;

    @Column({ nullable: false})
    password:string;


    @Column({ nullable: false})
    dob:string;

    @Column({ nullable: false})
    about_me:string;

    
}
