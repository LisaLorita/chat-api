import * as bcrypt from 'bcrypt';
import {
	BeforeInsert,
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

import { MessageEntity } from '../../messages/entities/message.entity';

@Entity('user')
export class UserEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({
		nullable: false,
	})
	name: string;

	@Column({
		unique: true,
		nullable: false,
	})
	email: string;

	@Column({
		nullable: false,
		select: false,
	})
	password: string;

	@Column({
		default: false,
	})
	isActive: boolean;

	@CreateDateColumn({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP',
	})
	createdAt: Date;

	@UpdateDateColumn({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP',
	})
	updatedAt: Date;

	@OneToMany(() => MessageEntity, (message) => message.sender)
	sentMessages: MessageEntity[];

	@OneToMany(() => MessageEntity, (message) => message.receiver)
	receivedMessages: MessageEntity[];

	@BeforeInsert()
	hashPassword(): void {
		this.password = bcrypt.hashSync(this.password, 10);
	}
}
