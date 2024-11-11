import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateMessageRequest } from './dtos/create-message-request.dto';
import { CreateMessageResponse } from './dtos/create-message-response.dto';
import { MessagesService } from './messages.service';

@ApiTags('messages')
@Controller('messages')
export class MessagesController {
	constructor(private readonly messagesService: MessagesService) {}

	@Post()
	@ApiOperation({ summary: 'Send message' })
	@ApiResponse({ status: 201, type: CreateMessageResponse, description: 'Message sent' })
	async send(@Body() request: CreateMessageRequest): Promise<CreateMessageResponse> {
		return this.messagesService.send(request);
	}
}
