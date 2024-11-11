import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

	@Column()
	createdAt: Date;

	@ManyToOne(() => UserEntity, (user) => user.sentMessages)
	@JoinColumn({ name: 'senderId' })
	sender: UserEntity;

	@ManyToOne(() => UserEntity, (user) => user.receivedMessages)
	@JoinColumn({ name: 'receiverId' })
	receiver: UserEntity;
}
