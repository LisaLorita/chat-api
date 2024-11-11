import { Body, Controller, Post } from '@nestjs/common';

import { CreateMessageRequest } from './dtos/create-message-request.dto';
import { CreateMessageResponse } from './dtos/create-message-response.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
	constructor(private readonly messagesService: MessagesService) {}

	@Post()
	async send(@Body() request: CreateMessageRequest): Promise<CreateMessageResponse> {
		return this.messagesService.send(request);
	}
}
