import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn, DeleteDateColumn, CreateDateColumn } from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })   
    email: string;

    @Exclude()
    @Column()
    password: string;   

    @Column()
    username: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}