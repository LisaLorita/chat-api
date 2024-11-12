import { MessageEntity } from '../entities/message.entity';

export class GetSentMessagesResponse {
	readonly data: MessageEntity[];
	readonly count: number;

	constructor(data: MessageEntity[], count: number) {
		this.data = data;
		this.count = count;
	}

	static create(data: MessageEntity[], count: number): GetSentMessagesResponse {
		return new GetSentMessagesResponse(data, count);
	}
}
