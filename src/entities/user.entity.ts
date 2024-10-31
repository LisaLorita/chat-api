import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        nullable: false
    })
    name: string; 

    @Column({
        unique: true,
        nullable: false
    })
    email: string;

    @Column({
        nullable: false,
        select: false
    })
    password: string;

    @Column({
        default: false
    })
    isActive: boolean;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'now'
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'now'
    })
    updatedAt: Date;
}