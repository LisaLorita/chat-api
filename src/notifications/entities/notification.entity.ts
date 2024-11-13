import { CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { MessageEntity } from '../../messages/entities/message.entity';

@Entity('notification')
export class NotificationEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@OneToOne(() => MessageEntity, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'messageId' })
	message: MessageEntity;

	@CreateDateColumn({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP',
	})
	createdAt: Date;
}
