import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { MailjetEmail, MailjetAskToken } from '@/mailjet/events/mj.events.req';
import { Events } from '@/mailjet/types/events.enum';

@Injectable()
export class MailjetEventEmitter {
	constructor(private eventEmitter: EventEmitter2) {}

	async accountValidated(email: string) {
		this.eventEmitter.emit(Events.accountValidated, new MailjetEmail(email));
	}

	async askActivationToken(email: string, token: string) {
		this.eventEmitter.emit(Events.askActivationToken, new MailjetAskToken(email, token));
	}
}
