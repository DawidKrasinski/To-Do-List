import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, DeleteDateColumn } from "typeorm"
import { Task } from "./Task"

@Entity()
export class Priority extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    color!: string
    
    @Column("int")
    order!: number

    @OneToMany(() => Task, (task) => task.priority)
    tasks!: Task[]

    @DeleteDateColumn()
    deletedAt: Date | null = null;

    constructor(
        name?: string,
        order?: number,
        color?: string,
    ) {
        super();
        this.name = name ?? '';
        this.order = order ?? 0;
        this.color = color ?? '';
    }
}