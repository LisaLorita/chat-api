import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '../users/users.module';
import { MessageEntity } from './entities/message.entity';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';

@Module({
	imports: [TypeOrmModule.forFeature([MessageEntity]), UsersModule],
	controllers: [MessagesController],
	providers: [MessagesService],
	exports: [],
})
export class MessagesModule {}
