import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { UserEntity } from '../../users/entities/user.entity';

@Entity('message')
export class MessageEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	content: string;

	@Column('uuid')
	senderId: string;

	@Column('uuid')
	receiverId: string;

	@CreateDateColumn({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP',
	})
	createdAt: Date;

	@ManyToOne(() => UserEntity, (user) => user.sentMessages)
	sender: UserEntity;

	@ManyToOne(() => UserEntity, (user) => user.receivedMessages)
	receiver: UserEntity;
}
