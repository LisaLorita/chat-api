import { MessageEntity } from '../entities/message.entity';
import { GetSentMessagesResponse } from './get-sent-messages-response.dto';

export class GetReceivedMessagesResponse extends GetSentMessagesResponse {
	static create(data: MessageEntity[], count: number): GetReceivedMessagesResponse {
		return new GetReceivedMessagesResponse(data, count);
	}
}
